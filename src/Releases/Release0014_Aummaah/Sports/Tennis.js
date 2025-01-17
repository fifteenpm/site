// source: https://codesandbox.io/s/white-resonance-0mgum?file=/src/App.js:388-427
// react-three-fiber is a way to express threejs declaratively: https://github.com/react-spring/react-three-fiber
// use-cannon is a hook around the cannon.js physics library: https://github.com/react-spring/use-cannon
import { useBox } from '@react-three/cannon';
import React, { useContext, useEffect, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as C from '../constants.js';
import { MaterialsContext } from '../MaterialsContext';
import Ball from './Ball';
import HittableSurface from './HittableSurface';
import { useStore } from './hooks.js';
import InstancedGrid from './InstancedGrid';
import { Lamp } from './Lamp';
import ParametricCloth from './ParametricCloth.js';
import StartOverSurface from './StartOverSurface';
import { lerp } from './utils.js';
import GamesCloth from './GamesCloth';

function TennisCube({ boxGeometryArgs, color, ...props }) {
    const ref = useRef()
    const { wireframe } = useContext(MaterialsContext)
    useEffect(() => {
        if (!wireframe) return;
        wireframe.color.set(new THREE.Color(color))
    }, [wireframe])
    return (
        <mesh receiveShadow ref={ref} material={wireframe} {...props}>
            <boxBufferGeometry attach="geometry" args={boxGeometryArgs} />
        </mesh>
    );
}

function TennisRacquet({ color, boxArgs, contactMaterial }) {
    // Load the gltf file
    const { nodes, materials } = useLoader(GLTFLoader, C.TENNIS_RACQUET_GLB)
    const model = useRef()
    // Make it a physical object that adheres to gravitation and impact
    const [ref, api] = useBox(() => ({ type: "Kinematic", args: boxArgs, material: contactMaterial, onCollide: () => handleCollision() }))
    const handleCollision = () => {
        //   api.applyImpulse([5, 5, 500], [0, 0, 0])
    }

    const { accentWireframe } = useContext(MaterialsContext)
    useEffect(() => {
        if (!accentWireframe) return;
        accentWireframe.color.set(new THREE.Color(color))
    }, [accentWireframe])

    // use-frame allows the component to subscribe to the render-loop for frame-based actions
    // let lerpVal = useRef(0)
    let values = useRef([0, 0])
    useFrame(state => {
        // The paddle is kinematic (not subject to gravitation), we move it with the api returned by useBox
        values.current[0] = lerp(values.current[0], (state.mouse.x * Math.PI) / 5, 1)
        values.current[1] = lerp(values.current[1], state.mouse.y, 1)
        api.position.set(state.mouse.x * 7.5, state.mouse.y, 5 - values.current[1] * .5)
        api.angularVelocity.set(values.current[1] * 40, 0, 0);// -values.current[1] * 4 )
        const mouseLeftOfCenter = state.mouse.x < -2.1;
        let rotationX = values.current[0] * .5
        let rotationY = values.current[1] * .5
        if (mouseLeftOfCenter) {
            rotationX = -rotationX
            rotationY = -rotationX
        }
        api.rotation.set(0, 0, 0)
        const modelRotation = mouseLeftOfCenter ? -Math.PI : 0;
        model.current.rotation.x = modelRotation;
        model.current.rotation.y = rotationY
        model.current.rotation.z = modelRotation;
    })

    return (
        <group>
            <mesh ref={ref} dispose={null} >
                <group ref={model}  >
                    {/* <mesh >
                        <boxBufferGeometry attach="geometry" args={boxArgs} />
                        <meshBasicMaterial attach="material" wireframe color="red" />
                    </mesh> */}
                    <group position-x={-2} position-z={1} rotation={[0, -0.04, 0]} >
                        <mesh castShadow receiveShadow material={accentWireframe} geometry={nodes.tennisRacket_1.geometry} />
                        <mesh castShadow receiveShadow material={accentWireframe} geometry={nodes.tennisRacket_2.geometry} />
                        <mesh castShadow receiveShadow material={accentWireframe} geometry={nodes.tennisRacket_3.geometry} />
                        <mesh castShadow receiveShadow material={accentWireframe} geometry={nodes.tennisRacket_4.geometry} />
                        {/* <mesh castShadow receiveShadow material={accentWireframe} geometry={nodes.tennisRacket_5.geometry} /> */}
                    </group>
                </group>
            </mesh>
        </group>
    )
}

function TennisNet({ color, ...props }) {
    const { wireframe2 } = useContext(MaterialsContext)
    useEffect(() => {
        if (!wireframe2) return;
        wireframe2.color.set(new THREE.Color(color))
    }, [wireframe2])
    return (
        <>
            <ParametricCloth material={wireframe2} setPinHandler={(u, v, xSegments, ySegments) => {
                return u == 0 || u == xSegments - 1
            }} {...props} />
        </>
    )
}


export default function Tennis({ ...props }) {
    const gameIsOn = useStore(state => state.gameIsOn)
    const { setGameIsOn } = useStore(state => state.api)
    const { color1, color2, light1, light2, accentColor } = {
        time: 0,
        color1: 0x092215,
        color2: 0x092215,
        light1: {
            color: "yellow",
        },
        light2: {
            color: "magenta",
        },
        accentColor: 0x893801,
        bloomFilter: {
            radius: 1,
            threshold: 0,
            exposure: .1,
            strength: 20,
        }
    }
    return <group>
        <GamesCloth
            // textOnly
            rotation={[Math.PI/2, 0, Math.PI/2]}
            position={[0, 25, 0]}
            windStrengthConstant={1000}
        />
        <Lamp color="red" spotIntensity={.03} pointIntensity={5} castShadow/>
        <pointLight position={[-1200, 1000, -5000]} color="turquoise" intensity={0.1} castShadow />
        <pointLight position={[1200, 1000, -5000]} color="orange" intensity={0.2} castShadow/>

        <ambientLight intensity={.2} />

        {gameIsOn && <Ball
            onInit={() => setGameIsOn(true)} {...props.ballProps}
            position={[0, 8, -20]}
            velocity={[0, 0, 7]}
            mass={.5}
            radius={.25}
            contactMaterial={{
                friction: 0.9,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }}
        />}
        <InstancedGrid dimensionSizeZ={22} dimensionSizeX={11} colorSelection={[color1, color1]} />
        <StartOverSurface rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} />
        <TennisRacquet
            boxArgs={[4, 3, 1]}
            color={color1}
            contactMaterial={{
                friction: 0.2,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }}
        />
        {/* <TennisCube
            color={color2}
            position={[-1, 0, -1]}
            boxGeometryArgs={[50, 50, 50, 50, 50, 1]}
        /> */}
        <TennisNet
            position={[0, 0, -1]}
            scale={[2, .4, .1]}
            distance={1}
            windStrength={400}
            color={color2}
            windStrengthConstant={800}
            windStrengthTimeDivisor={1000}
        />
        <HittableSurface
            key={"ground"}
            position={[0, -2, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            boxArgs={[20, 45, 1, 100, 100, 10]}
            visible={false}
            contactMaterial={{
                friction: 0.0,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }}
        />
        {/* <HittableSurface
            position={[0, -2, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            color={"lightcoral"}
            boxArgs={[20, 45, 1, 100, 100, 10]}
            visible={false}
            contactMaterial={{
                friction: 0.0,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }}
        />
         <HittableSurface
            position={[0, -2, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            color={"lightcoral"}
            boxArgs={[20, 45, 1, 100, 100, 10]}
            visible={false}
            contactMaterial={{
                friction: 0.0,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }}
        />
         <HittableSurface
            position={[0, -2, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            color={"lightcoral"}
            boxArgs={[20, 45, 1, 100, 100, 10]}
            visible={false}
            contactMaterial={{
                friction: 0.0,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }}
        /> */}
        {/* <Obstacles /> */}
    </group>
}
