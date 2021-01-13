import { useBox, useConvexPolyhedron } from '@react-three/cannon';
import React, { useContext, useMemo, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as C from '../constants.js';
import { MaterialsContext } from '../MaterialsContext';
import { Box } from './Box';
import Ground from './Ground';
import ParametricCloth from './ParametricCloth.js';
import StartOverSurface from './StartOverSurface';
import { lerp } from './utils.js';

function Mound({ sides, contactMaterial = {}, ...props }) {
    const { naiveGlass } = useContext(MaterialsContext)
    const geo = useMemo(() => {
        const g = new THREE.ConeGeometry(0.7, 0.7, sides, 1)
        g.mergeVertices()
        return g
    }, [])
    const [ref] = useConvexPolyhedron(() => ({ mass: 1, ...props, args: geo }))
    return (
        <mesh castShadow receiveShadow ref={ref} {...props} material={naiveGlass} geometry={geo} dispose={null} />
    )
}


function GolfFlag(props) {
    const { basicMaterial } = useContext(MaterialsContext)
    return (
        <>
            <group>
                <ParametricCloth setPinHandler={(u, v, xSegments, ySegments) => {
                    return u == 0
                }} {...props} />
                <group>
                    <mesh material={basicMaterial} position-x={props.position[0] - .1} position-z={props.position[2]} position-y={1.7} >
                        <boxBufferGeometry attach="geometry" args={[.02, 3, .01]} />
                    </mesh>
                </group>
            </group>
        </>
    )
}

function GolfClub({ mass, clubArgs, positionY, positionZ, contactMaterial }) {
    // Load the gltf file
    const { nodes, materials } = useLoader(GLTFLoader, C.GOLF_CLUB_GLB)
    const { greenWireframe } = useContext(MaterialsContext)
    const model = useRef()
    // Make it a physical object that adheres to gravitation and impact
    const [clubRef, clubAPI] = useBox(() => ({
        type: "Kinematic",
        mass: mass,
        args: clubArgs,
        material: contactMaterial,
        onCollide: () => {
            collideBehavior()
        }
    }))

    function collideBehavior() {
        clubAPI.applyForce([1, 10, -10], [0, 0, 0])
    }
    // use-frame allows the component to subscribe to the render-loop for frame-based actions
    let values = useRef([0, 0])

    const xPositionOffset = -.1
    useFrame(state => {
        values.current[0] = lerp(values.current[0], state.mouse.x, 0.2)
        values.current[1]= lerp(values.current[1], (state.mouse.y * Math.PI), 0.2)
        clubAPI.position.set(state.mouse.x + xPositionOffset, positionY, positionZ)
        clubAPI.rotation.set(values.current[1] * Math.PI / 8, values.current[0] * Math.PI / 2, 0)
        clubAPI.angularVelocity.set(values.current[1] * 10, 0, 0)
        // Left/right mouse movement rotates it a liitle for effect only
        // model.current.rotation.y = state.mouse.x > -0.3 ? -Math.PI : 0;;
    })

    return (
        <group>
            <mesh ref={clubRef} dispose={null} >
                <group ref={model}  >
                    <mesh >
                        <boxBufferGeometry attach="geometry" args={clubArgs} />
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
        {props.startOverSurfacesProps.map((surfaceProps, idx) => {
            return <StartOverSurface key={idx} {...surfaceProps} />
        })}
        <GolfFlag {...props.flagProps} />
        <GolfTee {...props.golfTeeProps} />
        <GolfClub {...props.golfClubProps} />
        {props.golfClubMoundProps.map((moundProps, idx) => {
            return <Mound key={idx} {...moundProps} />
        })}

    </group>
}
