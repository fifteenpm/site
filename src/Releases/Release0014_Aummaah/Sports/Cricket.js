import { useBox } from '@react-three/cannon';
import React, { useContext, useEffect, useRef } from "react";
import { useFrame, useLoader, useThree } from "react-three-fiber";
import { useMemo } from 'react/cjs/react.development';
import * as THREE from 'three';
import { ConstNode } from 'three-full';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as C from '../constants.js';
import { MaterialsContext } from '../MaterialsContext';
import Ball from './Ball';
import { Box } from './Box';
import HittableSurface from './HittableSurface';
import { useStore } from './hooks.js';
import InstancedGrid from './InstancedGrid';
import { Lamp } from './Lamp';
import ParametricCloth from './ParametricCloth';
import StartOverSurface from './StartOverSurface';
import { lerp } from './utils.js';

function CricketBat({ boxArgs }) {
    // Load the gltf file
    const { nodes, materials } = useLoader(GLTFLoader, C.CRICKET_BAT_GLB)
    const { wireframe } = useContext(MaterialsContext)
    const model = useRef()
    // Make it a physical object that adheres to gravitation and impact
    const [ref, api] = useBox(() => ({
        type: "Kinematic",
        args: boxArgs,
        onCollide: () => {
            onCollideBehavior()
        }
    }))
    const values = useRef([0, 0])
    function onCollideBehavior() {
        api.applyForce([0, 20, -20], [0, 0, 0])
        // y lerp
        // values.current[1] = lerp(values.current[1], state.mouse.y, 0.2)
        // set angular velocity
        // api.angularVelocity.set(values.current[1] * 40, 0, 0);
    }

    useFrame(state => {
        // x lerp
        values.current[0] = lerp(values.current[0], state.mouse.x, 0.2)
        // y lerp
        values.current[1] = lerp(values.current[1], state.mouse.y, 0.2)

        // set position
        api.position.set(state.mouse.x * 5, state.mouse.y * .5, -state.mouse.y + 6)

        // set rotation
        let movementX = values.current[0]
        let movementY = values.current[1]
        api.rotation.set(movementY * .5, movementY * .5, 0)
    })
    console.log(nodes)
    return (
        <group>
            {/*  */}
            <mesh ref={ref} dispose={null} position-x={-1} rotation-x={-2 * Math.PI}>
                <group ref={model}  >
                    {/* <mesh >
                        <boxBufferGeometry attach="geometry" args={boxArgs} />
                        <meshBasicMaterial attach="material" wireframe color="red" />
                    </mesh> */}
                    <group position-x={-1}>
                        <mesh castShadow receiveShadow material={wireframe} geometry={nodes.Mesh_0_0.geometry} />
                        <mesh castShadow receiveShadow material={wireframe} geometry={nodes.Mesh_0_1.geometry} />
                    </group>
                </group>
            </mesh>
        </group>
    )
}

function CricketWicket(props) {
    // const { setGameIsOn } = useStore(state => state.api)
    const contactMaterial = {
        friction: 10,
        restitution: 0.01,
        // contactEquationStiffness: 1e7,
        // contactEquationRelaxation: 1,
        // frictionEquationStiffness: 1e7,
        // frictionEquationRelaxation: 2,
    }
    const { naiveGlass, linedCement } = useContext(MaterialsContext)
    const [leg1] = useBox(() => ({ material: contactMaterial, ...props.leg1 }))
    const [leg2] = useBox(() => ({ material: contactMaterial, ...props.leg2 }))
    const [leg3] = useBox(() => ({ material: contactMaterial, ...props.leg3 }))
    const [topLeft] = useBox(() => ({ material: contactMaterial, ...props.topLeft }))
    const [topRight] = useBox(() => ({ material: contactMaterial, ...props.topRight }))
    const [base] = useBox(() => ({ type: "Kinematic", ...props.base }))



    return (
        <>
            <Box ref={leg1} material={linedCement} {...props.leg1} />
            <Box ref={leg2} material={linedCement} {...props.leg2} />
            <Box ref={leg3} material={linedCement} {...props.leg3} />
            <Box ref={topLeft} material={linedCement}{...props.topLeft} />
            <Box ref={topRight} material={linedCement}{...props.topRight} />
            <Box ref={base} material={linedCement} {...props.base} />
        </>
    )
}


function CricketNet({ color, ...props }) {
    const { wireframe } = useContext(MaterialsContext)
    useEffect(() => {
        if (!wireframe) return;
        wireframe.color.set(new THREE.Color(color))
    }, [wireframe])
    return (
        <>
            <ParametricCloth material={wireframe} setPinHandler={(u, v, xSegments, ySegments) => {
                return u == 0 || u == xSegments - 1
            }} {...props} />
        </>
    )
}

export default function Cricket(props) {
    const gameIsOn = useStore(state => state.gameIsOn)
    const { setGameIsOn } = useStore(state => state.api)
    const wicketZ = -3
    // const hittableSurfaceContactMaterial = useMemo(() => {
    //     return {
    //         friction: 0.9,
    //         restitution: 0.9,
    //         contactEquationStiffness: 1e7,
    //         contactEquationRelaxation: 1,
    //         frictionEquationStiffness: 1e7,
    //         frictionEquationRelaxation: 2,
    //     }
    // })

    const { color1, color2, color3, bloomFilter, light1, light2 } = {
        color1: "magenta",
        color2: "blue",
        color3: "red",
        bloomFilter: {
            radius: 0,
            strength: 2,
        },
        light1: {
            color: "yellow",
        },
        light2: {
            color: "magenta",
        },
    }

    // const { scene } = useThree()
    // const pointLight1 = useRef()
    // useEffect(() => {
    //     if (!pointLight1.current) return
    //     scene.add(new THREE.PointLightHelper(pointLight1.current))
    // }, [pointLight1.current])

    return <group>
        <Lamp color="magenta" pointIntensity={0.02} spotIntensity={0.06} />
        {/* left light */}
        <pointLight position={[-20, 600, -1200]} intensity={.09} color={color2} castShadow/>
        {/* right light */}
        <pointLight position={[20, 2, -40]} intensity={.85} color={color3} castShadow/>
        {/* above wicket */}
        <pointLight position={[-0.5, 2, 2]} intensity={0.03} color={color1} castShadow />
        {/* <pointLight position={[-0.5, 1.5, wicketZ + .5]} intensity={0.5} color={color2} />
         */} 

        <InstancedGrid dimensionSizeZ={20} dimensionSizeX={5} offsetX={1} />

        {gameIsOn && <Ball
            color="purple"
            onInit={() => setGameIsOn(true)}
            position={[0, 3, wicketZ + .25]}
            velocity={[0, 0, 5]}
            mass={1}
            radius={.25}
            contactMaterial={{
                friction: 0.0,
                restitution: 0.9,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 10,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }}
        />}
        <CricketNet
          position={[0, 5, -3]}
          color={0x37115a}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[5, 10, .1]}
          distance={1}
          windStrength={400}
          windStrengthConstant={10000}
          windStrengthTimeDivisor={1000}
        />
        <StartOverSurface
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -10, 0]}
            geometryArgs={[250, 250, 20, 20]}
            resetTime={4000}
        />

        <HittableSurface
            position={[0, -2, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            boxArgs={[8, 10, 1, 1, 1, 1]}
            contactMaterial={{
                friction: 0.9,
                restitution: 0.9,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }}
        />
        <CricketBat boxArgs={[9, 2, 1]} />
        {gameIsOn && <CricketWicket
            onInit={() => setGameIsOn(true)}
            leg1={{
                position: [-.7, .2, wicketZ],
                args: [.25, 2.5, .5],
                mass: .1,
            }}
            leg2={{
                position: [0, .2, wicketZ],
                args: [.25, 2.5, .5],
                mass: .1,
            }}
            leg3={{
                position: [.7, .2, wicketZ],
                args: [.25, 2.5, .5],
                mass: .1,
            }}
            topLeft={{
                position: [-.36, 3.3, wicketZ],
                args: [.12, .6, .5],
                rotation: [0, 0, Math.PI / 2],
                mass: .04,
            }}
            topRight={{
                position: [.36, 3.3, wicketZ],
                args: [.12, .6, .5],
                rotation: [0, 0, Math.PI / 2],
                mass: .04,
            }}
            base={{
                position: [0, -1.8, wicketZ],
                args: [4, -.5, 1],
                visible: false,
            }} />}

    </group>
}
