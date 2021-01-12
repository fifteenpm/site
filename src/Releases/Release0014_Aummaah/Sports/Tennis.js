// source: https://codesandbox.io/s/white-resonance-0mgum?file=/src/App.js:388-427
// react-three-fiber is a way to express threejs declaratively: https://github.com/react-spring/react-three-fiber
// use-cannon is a hook around the cannon.js physics library: https://github.com/react-spring/use-cannon
import { useBox } from '@react-three/cannon';
import React, { useContext, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as C from '../constants.js';
import { MaterialsContext } from '../MaterialsContext';
import HittableSurface from './HittableSurface';
import InstancedGrid from './InstancedGrid';
import { lerp } from './utils.js';


function TennisCube(props) {
    const ref = useRef()

    const { greenWireframe } = useContext(MaterialsContext)
    return (
        <mesh receiveShadow ref={ref} material={greenWireframe}>
            <boxBufferGeometry attach="geometry" scale-y={0} args={[100, 100, 100, 100]} />
        </mesh>
    );
}

function TennisRacquet({ boxArgs, contactMaterial }) {
    // Load the gltf file
    const { nodes, materials } = useLoader(GLTFLoader, C.TENNIS_RACQUET_GLB)
    const { greenWireframe } = useContext(MaterialsContext)
    const model = useRef()
    // Make it a physical object that adheres to gravitation and impact
    const [ref, api] = useBox(() => ({ type: "Kinematic", args: boxArgs, material: contactMaterial, onCollide: () => handleCollision() }))
    // const handleCollision = () => {
    //   console.log("APPLY FORCE: ", api)
    //   api.applyImpulse([5, 5, 500], [0, 0, 0])
    // }

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
            {/*  */}
            <mesh ref={ref} dispose={null} >
                <group ref={model}  >
                    <mesh >
                        <boxBufferGeometry attach="geometry" args={boxArgs} />
                        <meshBasicMaterial attach="material" wireframe color="red" />
                    </mesh>
                    {/* <Text rotation={[-Math.PI / 2, 0, 0]} position={[0, 1, 2]} size={1} /> */}
                    {/* children={count.toString()} /> */}
                    <group position-x={-2} rotation={[0, -0.04, 0]} >
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_1.geometry} />
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_2.geometry} />
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_3.geometry} />
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_4.geometry} />
                    </group>
                </group>
            </mesh>
        </group>
    )
}

export default function Tennis(props) {
    return <group>
        <InstancedGrid />
        <TennisRacquet {...props.tennisRacquetProps} />
        <TennisCube />
        {Object.values(props.hittableSurfaceProps).map((props, idx) => {
            return <HittableSurface key={idx} {...props} />
        })}
    </group>
}