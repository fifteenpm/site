import { useBox } from '@react-three/cannon';
import React, { useContext, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { useMemo } from 'react/cjs/react.development';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as C from '../constants.js';
import { MaterialsContext } from '../MaterialsContext';
import { Box } from './Box';
import HittableSurface from './HittableSurface';
import InstancedGrid from './InstancedGrid';
import StartOverSurface from './StartOverSurface';
import { lerp } from './utils.js';
import ParametricCloth from './ParametricCloth';

function CricketBat({ boxArgs }) {
    // Load the gltf file
    const { nodes, materials } = useLoader(GLTFLoader, C.CRICKET_BAT_GLB)
    const { greenWireframe } = useContext(MaterialsContext)
    const model = useRef()
    // Make it a physical object that adheres to gravitation and impact
    const [ref, api] = useBox(() => ({
        type: "Kinematic",
        args: boxArgs,
        onCollide: () => {
            onCollideBehavior()
        }
    }))
    function onCollideBehavior() {
        api.applyForce([0, 20, -20], [0, 0, 0])
    }
    let values = useRef([0, 0])
    useFrame(state => {
        // x lerp
        values.current[0] = lerp(values.current[0], state.mouse.x, 0.2)
        // y lerp
        values.current[1] = lerp(values.current[1], state.mouse.y, 0.2)

        // set position
        api.position.set(state.mouse.x * 5, state.mouse.y, -state.mouse.y + 6)

        // set rotation
        let movementX = values.current[0]
        let movementY = values.current[1]
        api.rotation.set(-2 * Math.PI, movementY, 0)

        // set angular velocity
        api.angularVelocity.set(values.current[1] * 40, 0, 0);
    })
    return (
        <group>
            {/*  */}
            <mesh ref={ref} dispose={null} position-x={-1} rotation-x={-2 * Math.PI}>
                <group ref={model}  >
                    <mesh >
                        <boxBufferGeometry attach="geometry" args={boxArgs} />
                        <meshBasicMaterial attach="material" wireframe color="red" />
                    </mesh>
                    <group position-x={-1}>
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.Mesh_0.geometry} />
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.Mesh_0_1.geometry} />
                    </group>
                </group>
            </mesh>
        </group>
    )
}

function CricketWicket(props) {
    const contactMaterial = {
        friction: 10,
        restitution: 0.01,
        // contactEquationStiffness: 1e7,
        // contactEquationRelaxation: 1,
        // frictionEquationStiffness: 1e7,
        // frictionEquationRelaxation: 2,
    }
    const { naiveGlass } = useContext(MaterialsContext)
    const [leg1] = useBox(() => ({ material: contactMaterial, ...props.leg1 }))
    const [leg2] = useBox(() => ({ material: contactMaterial, ...props.leg2 }))
    const [leg3] = useBox(() => ({ material: contactMaterial, ...props.leg3 }))
    const [topLeft] = useBox(() => ({ material: contactMaterial, ...props.topLeft }))
    const [topRight] = useBox(() => ({ material: contactMaterial, ...props.topRight }))
    const [base] = useBox(() => ({ type: "Kinematic", ...props.base }))

    return (
        <>
            <Box ref={leg1} material={naiveGlass} {...props.leg1} />
            <Box ref={leg2} material={naiveGlass} {...props.leg2} />
            <Box ref={leg3} material={naiveGlass} {...props.leg3} />
            <Box ref={topLeft} material={naiveGlass}{...props.topLeft} />
            <Box ref={topRight} material={naiveGlass}{...props.topRight} />
            <Box ref={base} material={naiveGlass} {...props.base} />
        </>
    )
}


function CricketNet(props) {
    const { greenWireframe } = useContext(MaterialsContext)
    return (
        <>
            <ParametricCloth material={greenWireframe} setPinHandler={(u, v, xSegments, ySegments) => {
                return u == 0 || u == xSegments - 1
            }} {...props} />
        </>
    )
}

export default function Cricket(props) {
    const wicketZ = -3
    const hittableSurfaceContactMaterial = useMemo(() => {
        return {
            friction: 0.0,
            restitution: 0.9,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
        }
    })
    return <group>
        <InstancedGrid dimensionSizeZ={20} dimensionSizeX={5} offsetX={1} />

        <pointLight position={[0, 4, -10]} intensity={1} color={props.light1Color} />
        <pointLight position={[0, 4, wicketZ]} intensity={1} color={props.light2Color} />
        <CricketNet 
            position={[1, 10, -1]}
            rotation={[-Math.PI/2, 0, 0]}
            scale={[5, 10, .1]}
            distance={1}
            windStrength={400}
            windStrengthConstant={800}
            windStrengthTimeDivisor={1000}
        />
        <StartOverSurface
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -10, 0]}
            geometryArgs={[250, 250, 20, 20]}
        />
        <HittableSurface
            position={[0, -2, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            boxArgs={[8, 15, 1, 100, 100, 10]}
            contactMaterial={hittableSurfaceContactMaterial}
        />
        <CricketBat boxArgs={[9, 2, 1]} />
        <CricketWicket
            leg1={{
                args: [.25, 1.5, .5],
                position: [-.7, 2, wicketZ],
                mass: .1,
            }}
            leg2={{
                args: [.25, 1.5, .5],
                position: [0, 2, wicketZ],
                mass: .1,
            }}
            leg3={{
                args: [.25, 1.5, .5],
                position: [.7, 2, wicketZ],
                mass: .1,
            }}
            topLeft={{
                position: [-.36, 4.8, wicketZ],
                args: [.1, .6, .5],
                rotation: [0, 0, Math.PI / 2],
                mass: .01,
            }}
            topRight={{
                position: [.36, 4.8, wicketZ],
                args: [.1, .6, .5],
                rotation: [0, 0, Math.PI / 2],
                mass: .01,
            }}
            base={{
                position: [0, 0, wicketZ],
                args: [4, -.5, 1],
            }} />

    </group>
}
