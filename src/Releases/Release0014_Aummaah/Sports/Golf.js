import { useBox, useConvexPolyhedron } from '@react-three/cannon';
import React, { useContext, useMemo, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as C from '../constants.js';
import { MaterialsContext } from '../MaterialsContext';
import { Box } from './Box';
import Ground from './Ground';
import { lerp } from './utils.js';


function Mound({ sides, contactMaterial = {}, ...props }) {
    const geo = useMemo(() => {
        const g = new THREE.ConeGeometry(0.7, 0.7, sides, 1)
        g.mergeVertices()
        return g
    }, [])
    const [ref] = useConvexPolyhedron(() => ({ mass: 1, ...props, args: geo }))
    return (
        <mesh castShadow ref={ref} {...props} geometry={geo} dispose={null}>
            <meshNormalMaterial attach="material" />
        </mesh>
    )
}


function GolfClub({ mass, poleArgs, positionY, positionZ, contactMaterial }) {
    // Load the gltf file
    const { nodes, materials } = useLoader(GLTFLoader, C.GOLF_CLUB_GLB)
    const { greenWireframe } = useContext(MaterialsContext)
    // const clubArgs = useMemo(() => [2, 2, 2])
    const model = useRef()
    // Make it a physical object that adheres to gravitation and impact
    const [poleRef, poleAPI] = useBox(() => ({
        type: "Kinematic",
        mass: mass,
        args: poleArgs,
        material: contactMaterial,
        onCollide: () => {
            // TODO (jeremy) not sure this does anything for kinematic other than
            // compute
            collideBehavior()
        }
    }))

    function collideBehavior() {
        poleAPI.applyForce([1, 10, -10], [0, 0, 0])
    }
    // const [clubRef, clubAPI] = useBox(() => ({ type: "Kinematic", args: clubArgs }))
    // use-frame allows the component to subscribe to the render-loop for frame-based actions
    let values = useRef(0)
    useFrame(state => {
        // values.current[0] = lerp(values.current[0], (state.mouse.x * Math.PI) / 5, 0.2)
        values.current = lerp(values.current, (state.mouse.y * Math.PI), 0.2)
        poleAPI.position.set(state.mouse.x * 1.5, positionY, positionZ)
        poleAPI.rotation.set(values.current, 0, 0)
        poleAPI.angularVelocity.set(values.current * 10, 0, 0)
        // Left/right mouse movement rotates it a liitle for effect only
        model.current.rotation.y = state.mouse.x > -0.3 ? -Math.PI : 0;;
    })

    return (
        <group>
            <mesh ref={poleRef} dispose={null} rotation-x={-2 * Math.PI}>
                <group ref={model}  >
                    <mesh >
                        <boxBufferGeometry attach="geometry" args={poleArgs} />
                        <meshBasicMaterial attach="material" wireframe color="red" />
                    </mesh>
                    <group scale={[.85, .85, .85]} position-x={.14} rotation-y={Math.PI / 2}>
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.golfClub.geometry} />
                    </group>
                </group>
            </mesh>
            {/* <mesh ref={clubRef} dispose={null} rotation-x={-2 * Math.PI}>
          <boxBufferGeometry attach="geometry" args={clubArgs} />
          <meshBasicMaterial attach="material" wireframe color="red" />
        </mesh> */}
        </group>
    )
}

function GolfTee({ boxArgs, color, ...props }) {
    const [tee] = useBox(() => ({ type: 'Static', args: boxArgs, ...props }))
    return (
        <>
            <Box ref={tee} args={boxArgs} color={color} />
        </>
    )
}


export default function Golf(props) {
    return <group>
        {/* <InstancedGrid dimensionSizeZ={50} /> */}
        <Ground {...props.groundProps} />
        <GolfTee {...props.golfTeeProps} />
        <GolfClub {...props.golfClubProps} />
        {props.golfClubMoundProps.map((moundProps, idx) => {
            return <Mound key={idx} {...moundProps} />
        })}

    </group>
}
