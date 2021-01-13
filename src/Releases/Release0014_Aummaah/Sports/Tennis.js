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
import ParametricCloth from './ParametricCloth.js';
import StartOverSurface from './StartOverSurface';
import { lerp } from './utils.js';


function TennisCube({ boxGeometryArgs, ...props }) {
    const ref = useRef()

    const { greenWireframe } = useContext(MaterialsContext)
    return (
        <mesh receiveShadow ref={ref} material={greenWireframe}>
            <boxBufferGeometry attach="geometry" scale-y={0} args={boxGeometryArgs} />
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
    const handleCollision = () => {
        //   api.applyImpulse([5, 5, 500], [0, 0, 0])
    }

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
    console.log("tennis node", nodes)
    return (
        <group>
            <mesh ref={ref} dispose={null} >
                <group ref={model}  >
                    {/* <mesh >
                        <boxBufferGeometry attach="geometry" args={boxArgs} />
                        <meshBasicMaterial attach="material" wireframe color="red" />
                    </mesh> */}
                    {/* <Text rotation={[-Math.PI / 2, 0, 0]} position={[0, 1, 2]} size={1} /> */}
                    {/* children={count.toString()} /> */}
                    <group position-x={-2} rotation={[0, -0.04, 0]} >
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_1.geometry} />
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_2.geometry} />
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_3.geometry} />
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_4.geometry} />
                        <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_5.geometry} />
                    </group>
                </group>
            </mesh>
        </group>
    )
}

function TennisNet(props) {
    const { greenWireframe } = useContext(MaterialsContext)
    return (
        <>
            <ParametricCloth material={greenWireframe} setPinHandler={(u, v, xSegments, ySegments) => {
                return u == 0 || u == xSegments - 1
            }} {...props} />
        </>
    )
}


export default function Tennis(props) {
    return <group>
        <InstancedGrid dimensionSizeZ={10} dimensionSizeX={10} {...props.instancedGridProps} />
        {props.startOverSurfacesProps.map((surfaceProps, idx) => {
            return <StartOverSurface key={idx} {...surfaceProps} />
        })}
        <TennisRacquet {...props.tennisRacquetProps} />
        <TennisCube boxGeometryArgs={[50, 50, 50, 50, 50, 1]} />
        <TennisNet {...props.tennisNetProps} />
        <HittableSurface
            key={"ground"}
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

    </group>
}
