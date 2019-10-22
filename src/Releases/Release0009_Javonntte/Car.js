import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useResource, useThree, useLoader } from 'react-three-fiber';
import { EmissiveMaterial, Metal03Material, TronMaterial } from '../../Utils/materials';
import { useKeyPress } from '../../Utils/hooks';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as C from './constants';

export function onCarElementLoaded(gltf) {
    // return gltf.scene
    const geometries = []
    gltf.scene.traverse(child => {
        if (child.isMesh) {
            const geometry = child.geometry.clone();
            geometry.name = child.name;
            geometries.push(geometry);
        }
    })
    return geometries;
}

function Wheel({ gltf, rotation }) {
    const [wheelRef, wheel] = useResource()
    const { camera } = useThree();
    const axis = useMemo(() => {
        return new THREE.Vector3(0., 1., 0.);
    })
    useFrame(() => {
        if (!wheel) return;
        // TODO this looks dumb, needs to rotate on axis at center of wheel
        wheel.rotation.z = rotation.z * .1;

    })
    return <group ref={wheelRef}>
        <mesh name="wheel" >
            <bufferGeometry attach="geometry" {...gltf.__$[6].geometry} />
            <meshStandardMaterial attach="material" {...gltf.__$[6].material} />
        </mesh>
        <mesh name="wheel_internal" >
            <bufferGeometry attach="geometry" {...gltf.__$[7].geometry} />
            <meshStandardMaterial attach="material" {...gltf.__$[7].material} />
        </mesh>
        <mesh name="Gloves" >
            <bufferGeometry attach="geometry" {...gltf.__$[8].geometry} />
            <meshStandardMaterial attach="material" {...gltf.__$[8].material} />
        </mesh>
        <mesh name="Tops" >
            <bufferGeometry attach="geometry" {...gltf.__$[9].geometry} />
            <meshStandardMaterial attach="material" {...gltf.__$[9].material} />
        </mesh>
    </group>
}

function DashButtons({ gltf }) {
    return <group>
        <mesh name="button_swing" >
            <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
            <meshStandardMaterial attach="material" {...gltf.__$[1].material} />
        </mesh>
        <mesh name="button_life" >
            <bufferGeometry attach="geometry" {...gltf.__$[2].geometry} />
            <meshStandardMaterial attach="material" {...gltf.__$[2].material} />
        </mesh>
        <mesh name="button_dream" >
            <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
            <meshStandardMaterial attach="material" {...gltf.__$[3].material} />
        </mesh>
        <mesh name="button_natural" >
            <bufferGeometry attach="geometry" {...gltf.__$[4].geometry} />
            <meshStandardMaterial attach="material" {...gltf.__$[4].material} />
        </mesh>
    </group>
}

function DashCam(props) {
    const ref = useRef()
    const { aspect, size, setDefaultCamera } = useThree()
    const t = useThree();
    // Make the camera known to the system
    useEffect(() => {
        ref.current.aspect = aspect;
        ref.current.updateMatrixWorld()
        setDefaultCamera(ref.current);
    }, [])
    // Update it every frame
    useFrame(() => ref.current.updateMatrixWorld())
    return <perspectiveCamera
        ref={ref}
        aspect={size.width / size.height}
        radius={(size.width + size.height) / 4}
        fov={55}
        position={[0, .068, .15]}
        onUpdate={self => self.updateProjectionMatrix()}
    />
}

export default function Car({
    dashCamRef,
    road,

    roadOffset,
    onLightsButtonClicked,
}) {
    const [tronMaterialRef, tronMaterial] = useResource();
    const [metal03MaterialRef, metal03Material] = useResource();
    const gltf = useLoader(GLTFLoader, C.CAR_URL, loader => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco-gltf/')
        loader.setDRACOLoader(dracoLoader)
    })
    const { size, viewport, clock, setDefaultCamera } = useThree();
    const [carRef, car] = useResource();
    const [normal, binormal, up] = useMemo(() => {
        return [
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(0, 2, 2), // TODO these is supposed to be normalized to 1 and have only 1 non zero value lol  
        ]
    });
    const accelerationPressed = useKeyPress('ArrowUp');
    const slowDownPressed = useKeyPress('ArrowDown');
    const cur = useRef();
    const delta = useRef();
    const speed = useRef();

    useEffect(() => {
        if (!speed.current) {
            speed.current = 20;
        }
        if (!delta.current) {
            delta.current = .01;
        }
        if (!cur.current) {
            cur.current = 0;
        }
    })

    // TODO http://jsfiddle.net/krw8nwLn/66/
    useFrame(() => {
        // TODO these floats as constants?
        if (accelerationPressed) {
            if (delta.current < .05) {
                speed.current -= .1;
                delta.current += .001;
            }
        }
        if (slowDownPressed) {
            if (delta.current >= 0) {
                speed.current += .1;
                delta.current -= .001;
            }
            if (delta.current < 0) {
                delta.current = 0;
            }

        }
        cur.current += delta.current;
        console.log('speed:', speed.current, 'delta', delta.current, 'cur', cur.current);
        // const t = (clock.elapsedTime % speed.current) / speed.current;
        const t = (cur.current % speed.current) / speed.current;
        const pos = road.parameters.path.getPointAt(t);
        // interpolation
        const segments = road.tangents.length;
        const pickt = t * segments;
        const pick = Math.floor(pickt);
        const pickNext = (pick + 1) % segments;
        binormal.subVectors(road.binormals[pickNext], road.binormals[pick]);
        binormal.multiplyScalar(pickt - pick).add(road.binormals[pick]).add(up);
        const dir = road.parameters.path.getTangentAt(t);
        normal.copy(binormal).cross(dir)
        // We move on a offset on its binormal
        pos.add(normal.clone().multiplyScalar(roadOffset));
        car.position.copy(pos);
        // Using arclength for stablization in look ahead.
        const lookAt = road.parameters.path.getPointAt((t + 30 / road.parameters.path.getLength()) % 1);
        // Camera Orientation 2 - up orientation via normal
        lookAt.copy(pos).add(dir);
        car.matrix.lookAt(car.position, lookAt, normal);
        car.rotation.setFromRotationMatrix(car.matrix);
        car.rotation.z += Math.PI / 12; // TODO added code - can it be baked into matrix rotation?
    })


    // TODO render order to make sure the car's always in front https://discourse.threejs.org/t/always-render-mesh-on-top-of-another/120/5
    return (
        <group ref={carRef}>
            <DashCam />
            <TronMaterial
                materialRef={tronMaterialRef}
                bpm={120} // TODO
            />
            <Metal03Material materialRef={metal03MaterialRef} />
            {/* Auto generated using gltfjsx --> */}
            {car && <DashButtons gltf={gltf} />}
            {tronMaterial && <mesh name="speedometer" material={tronMaterial}>
                <bufferGeometry attach="geometry" {...gltf.__$[5].geometry} />
            </mesh>}
            {car && <Wheel gltf={gltf} rotation={car.rotation} />}

        </group>)
}