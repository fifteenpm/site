import { usePlane, useSphere } from '@react-three/cannon';
import React, { useEffect, useContext, useMemo, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import niceColors from 'nice-color-palettes'
import { MaterialsContext } from '../MaterialsContext'
console.log("NICE COLORS", niceColors)
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
const dimensionSizeZ = 25
const dimensionSizeX = 10
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
console.log("COLORS:", colors[0], colors[1], colors[5001])
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
function TennisCourt({ ...props }) {
    const [hovered, set] = useState()
    const colorArray = useMemo(() => Float32Array.from(new Array(numInstances).fill().flatMap((_, i) => {
        console.log('setting color:', colors[i], colors)
        return tempColor.set(colors[i]).toArray()
    })), [])
    console.log("COLOR ARRAY LENGTH", colorArray.length, 'numInstances', numInstances)
    const ref = useRef()
    const previous = useRef()
    useEffect(() => void (previous.current = hovered), [hovered])
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
                // const colorOffset = i
                // const colorIdxOffset = Math.min(Math.floor(time % 1 * interval + id), colorArray.length - 1)
                // const colorIdxOffset = Math.floor(time % 1 * colorArray.length) + id % colorArray.length

                // console.log("colorOffset", colorIdxOffset, time % 1, "colorArray.length", colorArray.length)
                // tempColor.set(colors[id]).toArray(colorArray, colorIdxOffset)
                const timeUnit = 4
                const timeFract = timeUnit - time % timeUnit + .02 / timeUnit
                if (((z + 1) / dimensionSizeZ) < timeFract && x % 2 == 0) {
                    tempColor.set("white").toArray(colorArray, id * 3)
                } else if (z % 2 == 0) {
                    tempColor.set("yellow").toArray(colorArray, id * 3)
                } else {
                    tempColor.set("teal").toArray(colorArray, id * 3)
                }
                // tempColor.set(colors[id]).toArray(colorArray, id)
                // if (time % 1 * z > interval/2){
                //     tempColor.set()
                // }
                // tempColor.set(colors[id]).toArray(colorArray, Math.min(Math.floor(time % 1 * interval + id), colorArray.length - 1))
                ref.current.geometry.attributes.color.needsUpdate = true
                //colors[id].toArray(colorArray, Math.floor(time) + id)
                // tempObject.position.set(5 - x, 5 - y, 5 - z)
                // tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
                // tempObject.rotation.z = tempObject.rotation.y * 2
                // if (hovered !== previous.current) {
                //     tempColor.set(id === hovered ? 'white' : colors[id]).toArray(colorArray, id * 3)
                //     ref.current.geometry.attributes.color.needsUpdate = true
                // }
                // const scale = id === hovered ? 2 : 1
                // tempObject.scale.set(scale, scale, scale)
                tempObject.rotation.x = Math.PI / 2
                tempObject.position.set(1 - x, 0, 1 - z)
                tempObject.updateMatrix()
                ref.current.setMatrixAt(id, tempObject.matrix)
            }
        ref.current.instanceMatrix.needsUpdate = true
    })


    return (
        <instancedMesh ref={ref} args={[null, null, numInstances]} >
            {/* <planeBufferGeometry attach="geometry" args={[0.7, 0.7]}> */}
            <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}>
                <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
            </boxBufferGeometry>
            {/* </planeBufferGeometry> */}
            <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} />
        </instancedMesh>
    )
}


export const Tennis = function (props) {
    return <>
        <TennisBall {...props} />
        <TennisCourt />
    </>;
}
