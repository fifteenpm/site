import { usePlane, useSphere } from '@react-three/cannon';
import React, { useEffect, useContext, useMemo, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import niceColors from 'nice-color-palettes'
import { MaterialsContext } from '../MaterialsContext'

// function TennisCourtSurface(props) {
//     const [plane] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [props.pos.x, props.pos.y, props.pos.z] }))
//     // const plane = useRef()
//     return (
//         <mesh ref={plane} material={props.tennisCourtSurface}>
//             {/* <mesh ref={plane} material={props.tennisCourtSurface} rotation={[-Math.PI / 2, 0, 0]} position={props.pos}> */}
//             <planeGeometry args={[props.size, props.size]} attach="geometry" />
//         </mesh>
//     );
// }

function TennisCourtSurface({ color, ...props }) {
    const [ref] = usePlane(() => ({ type: "Kinematic", ...props }))
    const scale = 1
    return (
        <mesh ref={ref} receiveShadow scale={[scale, scale, scale]}>
            <planeBufferGeometry attach="geometry" args={[props.size / 2, props.size / 2]} />
            <meshPhongMaterial attach="material" color={color} side={THREE.Double} />
        </mesh>
    )
}
const dimensionSizeZ = 5
const dimensionSizeX = 8
const scaleX = 10
const scaleZ = 5
const dimensionSizeY = 10
const numInstances = dimensionSizeZ * dimensionSizeX// * dimensionSizeY
const tempObject = new THREE.Object3D()
// COLORS: #e84a5f #fecea8 #2a363b
// const colors = new Array(numInstances).fill().map(() => niceColors[17][Math.floor(Math.random() * 5)])
const colors = new Array(numInstances).fill().map(() => 0xff00ff)
// COLORS: #2a363b #2a363b #99b898
// const colors = new Array(numInstances).fill().map((_,idx) => {
//     let color = 0x000000
//     // if (idx <  numInstances / 3){
//     //     color = 0xffff00
//     // }
//     // if (idx < numInstances / 2){
//     //     color = 0xffffff
//     // }
//     // if (idx < numInstances * .75){
//     //     color = 0x0000ff
//     // }
//     // // const gonnaUse = niceColors[17][useIdx]
//     return color
// })
const tempColor = new THREE.Color()

// function TennisCourt({ numInstances = 10, ...props }) {
//     const colorArray = useMemo(() => Float32Array.from(new Array(numInstances).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())), [])
//     const ref = useRef()
//     console.log('TennisCourt props', props)
//     return (
//         // <group>
//         //     {/* <TennisCourtSurface position={[props.pos.x, props.pos.y, props.pos.z]} color="red" /> */}
//         //     <TennisCourtSurface color="red" position={[props.pos.x, props.pos.y, props.pos.z - props.size/2]} rotation={[0, 0, Math.PI/2]} />
//         //     <TennisCourtSurface color="yellow" position={[props.pos.x, props.pos.y, props.pos.z + props.size/2]} rotation={[0,  0, -Math.PI/2]} />
//         //     <TennisCourtSurface color="green" position={[props.pos.x - props.size/2, props.pos.y, props.pos.z]} rotation={[0, Math.PI/2, 0]} />
//         //     <TennisCourtSurface color="blue" position={[props.pos.x + props.size/2, props.pos.y, props.pos.z]} rotation={[0, -Math.PI/2, 0]} />
//         //     <TennisCourtSurface color="gray" position={[props.pos.x, props.pos.y + props.size/2, props.pos.z]} rotation={[Math.PI/2, 0, 0]} />
//         //     <TennisCourtSurface color="magenta" position={[props.pos.x, props.pos.y - props.size/2, props.pos.z]} rotation={[-Math.PI/2, 0, 0]} />
//         // </group>
//         <instancedMesh ref={ref} args={[null, null, numInstances]} >
//             {/* <planeBufferGeometry attach="geometry" args={[props.size / 2, props.size / 2]}> */}
//             <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}>
//                 <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
//             </boxBufferGeometry>
//             {/* </planeBufferGeometry> */}
//             <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} />
//         </instancedMesh>
//     );
// }


function TennisBall(props) {
    const { tennisBall } = useContext(MaterialsContext)
    const [ball] = useSphere(() => ({
        mass: .01,
        // position: [props.pos.x, props.pos.y + .1, props.pos.z],
        position: [0, 2, 7],
        linearDamping: 0.3,
    })) //{ mass: 10 }))
    // const ball = useRef()
    // useFrame(() => {
    //     if (!ball.current) return;
    //     ball.current.rotation.y += .01
    // })
    // console.log("BALL", ball)

    return (
        // rotation-y={props.pos.y} scale={[.1,.1,.1]}>
        <mesh material={tennisBall} ref={ball}>
            {/* <sphereBufferGeometry attach="geometry" /> */}
            <sphereBufferGeometry attach="geometry" args={[1, 8]} />
        </mesh>
    )
}
//https://codesandbox.io/s/r3f-instanced-colors-8fo01?from-embed
export default function TennisCourt({ ...props }) {
    // const [hovered, set] = useState()
    const colorArray = useMemo(() => Float32Array.from(new Array(numInstances).fill().flatMap((_, i) => {
        return tempColor.set(colors[i]).toArray()
    })), [])
    const ref = useRef()
    // const previous = useRef()
    // useEffect(() => void (previous.current = hovered), [hovered])
    const interval = Math.floor(Math.sqrt(numInstances))
    useFrame(state => {
        const time = state.clock.getElapsedTime()
        // ref.current.rotation.x = Math.PI / 2
        // ref.current.rotation.y = Math.sin(time / 2)
        let i = 0
        for (let x = 0; x < dimensionSizeX; x++)
            // for (let y = 0; y < dimensionSizeY; y++)
            for (let z = 0; z < dimensionSizeZ; z++) {
                const id = i++
                const timeUnit = 4
                const timeFract = timeUnit - time % timeUnit + .02 / timeUnit
                if (((z + 1) / dimensionSizeZ) < timeFract && x % 2 == 0) {
                    tempColor.set("white").toArray(colorArray, id * 3)
                } else if (z % 2 == 0) {
                    tempColor.set("yellow").toArray(colorArray, id * 3)
                } else {
                    tempColor.set("teal").toArray(colorArray, id * 3)
                }
                ref.current.geometry.attributes.color.needsUpdate = true
                tempObject.rotation.x = -Math.PI / 2
                tempObject.position.set(
                    (x - dimensionSizeX / 2) * scaleX,
                    -5,
                    (z - dimensionSizeZ / 2) * scaleZ,
                )
                tempObject.updateMatrix()
                ref.current.setMatrixAt(id, tempObject.matrix)
            }
        ref.current.instanceMatrix.needsUpdate = true
    })



    return (
        <instancedMesh ref={ref} args={[null, null, numInstances]} >
            <planeBufferGeometry attach="geometry" args={[scaleX - .1, scaleZ - .1]}>
                {/* <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}> */}
                <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
                {/* </boxBufferGeometry> */}
            </planeBufferGeometry>
            <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} />
        </instancedMesh>
    )
}

