import { useBox, useConvexPolyhedron } from '@react-three/cannon';
import React, { useContext, useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "react-three-fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as C from '../constants.js';
import { MaterialsContext } from '../MaterialsContext';
import Ball from './Ball';
import { Box } from './Box';
import Ground from './Ground';
import { useStore } from './hooks.js';
import ParametricCloth from './ParametricCloth.js';
import StartOverSurface from './StartOverSurface';
import { lerp } from './utils.js';
import { Lamp } from './Lamp';
import clamp from 'lodash-es/clamp'
import Bubbles from './Bubbles';
import Water from './Water';

function Mound({ color, sides, contactMaterial = {}, physicsType = "Dynamic", ...props }) {
    const { tennisBall, naiveGlass, gridMaterial } = useContext(MaterialsContext)
    useEffect(() => {
        gridMaterial.color.set(new THREE.Color(color))
    }, [gridMaterial])
    const geo = useMemo(() => {
        const g = new THREE.ConeGeometry(0.7, 0.7, sides, 1)
        g.mergeVertices()
        return g
    }, [])
    const [ref] = useConvexPolyhedron(() => ({ type: physicsType, mass: 1, ...props, args: geo }))
    return (
        <mesh castShadow receiveShadow ref={ref} {...props} material={gridMaterial} geometry={geo} dispose={null} />
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

function GolfClub({ color, mass, clubArgs, positionY, positionZ }) {
    // Load the gltf file
    const contactMaterial = useMemo(() => {
        return {
            friction: 0,
            restitution: 0.1,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
        }
    })
    const { nodes, materials } = useLoader(GLTFLoader, C.GOLF_CLUB_GLB)
    const { wireframe2 } = useContext(MaterialsContext)
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
        clubAPI.applyForce([0, 40, -20], [0, 0, 0])
    }
    // use-frame allows the component to subscribe to the render-loop for frame-based actions
    let values = useRef([0, 0])
    const xPositionOffset = -.1
    useFrame(state => {
        values.current[0] = lerp(values.current[0], state.mouse.x, 0.2)
        values.current[1] = lerp(values.current[1], state.mouse.y, 0.9)
        clubAPI.position.set(state.mouse.x * .2 + xPositionOffset, positionY, positionZ)
        let rotateX = values.current[1] * Math.PI / 3;
        if (rotateX < .1){
            rotateX = .1
        }
        let rotateY = values.current[0] * Math.PI / 4;
        let rotateZ = 0
        clubAPI.rotation.set(rotateX, rotateY, rotateZ)
        clubAPI.angularVelocity.set(values.current[1] * 20, 0, 0)
    })
    useEffect(() => {
        if (!wireframe2) return;
        wireframe2.color.set(new THREE.Color(color))
    }, [wireframe2])
    return (
        <group>
            <mesh ref={clubRef} dispose={null} >
                <group ref={model}  >
                    {/* <mesh >
                        <boxBufferGeometry attach="geometry" args={clubArgs} />
                        <meshBasicMaterial attach="material" wireframe color="red" />
                    </mesh> */}
                    <group scale={[.85, .85, .85]} position-x={.14} rotation-y={Math.PI / 2}>
                        <mesh castShadow receiveShadow material={wireframe2} geometry={nodes.golfClub.geometry} />
                    </group>
                </group>
            </mesh>
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
    const gameIsOn = useStore(state => state.gameIsOn)
    const { setGameIsOn } = useStore(state => state.api)
    const golfClubTeeZ = 10
    const golfFlagPos = [-5, 3, -2]

    const { color1, color2, accentColor, light1, light2 } = {
        bloomFilter: {
            radius: 0,
            strength: 2,
        },
        color1: "blue",
        color2: 0x380022,
        accentColor: 0xd30080,
        // light1: {
        //     color: "yellow",
        // },
        // light2: {
        //     color: 0x82004e,
        // }
    }
    const { circleAlphaShader, wireframe2 } = useContext(MaterialsContext)

    return <group>
        {/* <pointLight
            ref={light1}
            position={[100, 100, 100]}
            intensity={2}
            color="green"
            castShadow
        /> */}
        {/* <pointLight
            ref={light2}
            position={[0, 0, golfClubTeeZ]}
            intensity={.5}
            color={props.color2}
        /> */}
        <hemisphereLight />
        {/* <Lamp /> */}
        {gameIsOn && <Ball
            onInit={() => setGameIsOn(true)}
            position={[0, 5, 9.5]}
            velocity={[0, 0, 0]}
            mass={.01}
            radius={.1}
            color={"yellow"}
            contactMaterial={{
                friction: 0.1,
                restitution: 0.9,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }}
        />
        }
        {/* <Bubbles count={100}/> */}
        {/* <Ground
            position={[0, -1, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            visible={true}
            color="blue"
        /> */}
        <Water  
         //material={circleAlphaShader}
         position={[0, -1, 0]} 
         rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          color="blue" 
         windStrengthConstant={100}/>

        <GolfFlag position={golfFlagPos}
            scale={[.04, .03, .00001]}
            distance={1}
            windStrength={3}
            windStrengthConstant={800}
            windStrengthTimeDivisor={100} />

        <GolfTee
            position={[0, 0, 9.5]}
            boxArgs={[.05, .25, .015]}
            type={"Kinematic"}
            color={accentColor}
        />
        <GolfClub
            clubArgs={[2, 1.5, .2]}
            positionY={0.6}
            positionZ={golfClubTeeZ - 0.2}
            color={"white"}
        />
        <Mound
            position={[0, -0.3, 9.5]}
            sides={4}
            scale={[1, 1, 1]}
            physicsType="Kinematic"
            color={color1}
        />

        {/* Obstacles */}
        <Mound
            position={[-5, 3, -2]}
            sides={3}
            scale={[5, 3, 5]}
            color={color2}
        />
        <Mound
            position={[15, 5, -20]}
            sides={8}
            scale={[8, 5, 7]}
            color={color2}
        />
        <StartOverSurface rotation={[0, 0, 0]} position={[0, 0, -23]} />
        <StartOverSurface rotation={[0, -Math.PI, 0]} position={[0, 0, 15]} />
        <StartOverSurface rotation={[0, -Math.PI / 2, 0]} position={[10, 0, 0]} />
        <StartOverSurface rotation={[0, Math.PI / 2, 0]} position={[-10, 0, 0]} />

        {/* <Mound
            position={golfFlagPos}
            sides={4}
            scale={[5, 3, 5]}
            color={color2}
        />
        <Mound
            position={[0, 10, -15]}
            sides={4}
            scale={[8, 5, 7]}
            color={color2}
        />
        <Mound
            position={[10, 13, -10]}
            sides={4}
            scale={[5, 3, 5]}
            color={color2}
        />

        <StartOverSurface rotation={[0, 0, 0]} position={[0, 0, -13]} />
        <StartOverSurface rotation={[0, -Math.PI, 0]} position={[0, 0, 15]} />
        <StartOverSurface rotation={[0, -Math.PI / 2, 0]} position={[10, 0, 0]} />
        <StartOverSurface rotation={[0, Math.PI / 2, 0]} position={[-10, 0, 0]} /> */}

    </group>
}
