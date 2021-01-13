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
    // use-frame allows the component to subscribe to the render-loop for frame-based actions
    let values = useRef([0, 0])
    useFrame(state => {
        // x lerp
        values.current[0] = lerp(values.current[0], state.mouse.x, 0.2)
        // y lerp
        values.current[1] = lerp(values.current[1], state.mouse.y, 0.2)

        // set position
        api.position.set(state.mouse.x * 5, state.mouse.y, -state.mouse.y + 6)

        // set rotation
        const mouseLeftOfCenter = state.mouse.x < -2.1;
        let movementX = values.current[0]
        if (mouseLeftOfCenter) {
            movementX = -movementX
        } else if (state.mouse.y > .75) {
            movementX = lerp(movementX, 0, .2)
        }
        api.rotation.set(-2 * Math.PI, movementX, 0)

        // set angular velocity
        api.angularVelocity.set(values.current[1] * 40, 0, 0);// -values.current[1] * 4 )

        // set model
        const modelRotation = mouseLeftOfCenter ? -Math.PI : 0;
        model.current.rotation.x = modelRotation;
        model.current.rotation.z = modelRotation;
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
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.Mesh_0_0.geometry} />
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



export default function Cricket(props) {
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
        <InstancedGrid dimensionSizeZ={20} dimensionSizeX={6} />
        <StartOverSurface
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -10, 0]}
            geometryArgs={[250, 250, 20, 20]}
        />
        <CricketBat boxArgs={[9, 2, 1]} />
        <CricketWicket {...props.cricketWicketProps} />
        <HittableSurface
            position={[0, -2, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            boxArgs={[8, 10, 1, 100, 100, 10]}
            contactMaterial={hittableSurfaceContactMaterial}
        />
    </group>
}
