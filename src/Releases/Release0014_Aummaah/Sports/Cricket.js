import { useBox } from '@react-three/cannon';
import React, { useContext, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as C from '../constants.js';
import { MaterialsContext } from '../MaterialsContext';
import { Box } from './Box';
import HittableSurface from './HittableSurface';
import InstancedGrid from './InstancedGrid';
import { lerp } from './utils.js';




function CricketBat({ boxArgs }) {
    // Load the gltf file
    const { nodes, materials } = useLoader(GLTFLoader, C.CRICKET_BAT_GLB)
    const { greenWireframe } = useContext(MaterialsContext)

    const model = useRef()
    // Make it a physical object that adheres to gravitation and impact
    const [ref, api] = useBox(() => ({ type: "Kinematic", args: boxArgs }))
    // use-frame allows the component to subscribe to the render-loop for frame-based actions
    let values = useRef([0, 0])
    const yOffset = 0;
    useFrame(state => {
        // The paddle is kinematic (not subject to gravitation), we move it with the api returned by useBox
        // values.current[0] = lerp(values.current[0], (state.mouse.x * Math.PI) / 5, 0.2)
        values.current[1] = lerp(values.current[1], state.mouse.y, 0.2)
        api.position.set(state.mouse.x * 5, state.mouse.y + yOffset, 5)
        const mouseLeftOfCenter = state.mouse.x < -2.1;
        let rotationY = values.current[1]
        if (mouseLeftOfCenter) {
            rotationY = -rotationY
        } else if (state.mouse.y > .75) {
            rotationY = lerp(rotationY, 0, .2)
        }
        api.rotation.set(-2 * Math.PI, rotationY, 0)
        api.angularVelocity.set(values.current[1] * 40, 0, 0);// -values.current[1] * 4 )
        // Left/right mouse movement rotates it a liitle for effect only
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
    return <group>
        <InstancedGrid dimensionSizeZ={25} />
        <CricketBat {...props.cricketBatProps} />
        <CricketWicket {...props.cricketWicketProps} />
        {Object.values(props.hittableSurfaceProps).map((props, idx) => {
            return <HittableSurface key={idx} {...props} />
        })}
    </group>
}
