import { usePlane, useSphere } from '@react-three/cannon';
import React, { useEffect, useContext, useMemo, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import niceColors from 'nice-color-palettes'
import { MaterialsContext } from '../MaterialsContext'
import '../../../Common/Utils/GridHelper';

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
const dimensionSizeZ = 24
const dimensionSizeX = 1024
const scaleX = 3
const scaleZ = 3
const dimensionSizeY = 10
const numInstances = dimensionSizeZ * dimensionSizeX// * dimensionSizeY
const tempObject = new THREE.Object3D()
const colors = new Array(numInstances).fill().map(() => 0xff00ff)
const tempColor = new THREE.Color()

//https://codesandbox.io/s/r3f-instanced-colors-8fo01?from-embed
export default function TennisCourt({ ...props }) {
    const { sunsetGradient, wireframe } = useContext(MaterialsContext)
    // const [hovered, set] = useState()
    const colorArray = useMemo(() => Float32Array.from(new Array(numInstances).fill().flatMap((_, i) => {
        return tempColor.set(colors[i]).toArray()
    })), [])


    const ref = useRef()
    // const previous = useRef()
    // useEffect(() => void (previous.current = hovered), [hovered])
    const interval = Math.floor(Math.sqrt(numInstances))
    // useFrame(state => {
    //     const time = state.clock.getElapsedTime()
    //     // ref.current.rotation.x = Math.PI / 2
    //     // ref.current.rotation.y = Math.sin(time / 2)
    //     let i = 0
    //     for (let x = 0; x < dimensionSizeX; x++)
    //         // for (let y = 0; y < dimensionSizeY; y++)
    //         for (let z = 0; z < dimensionSizeZ; z++) {
    //             const id = i++
    //             const timeUnit = 4
    //             const timeFract = timeUnit - time % timeUnit + .02 / timeUnit
    //             if (((z + 1) / dimensionSizeZ) < timeFract && x % 2 == 0) {
    //                 tempColor.set("white").toArray(colorArray, id * 3)
    //             } else if (z % 2 == 0) {
    //                 tempColor.set("yellow").toArray(colorArray, id * 3)
    //             } else {
    //                 tempColor.set("teal").toArray(colorArray, id * 3)
    //             }
    //             ref.current.geometry.attributes.color.needsUpdate = true
    //             tempObject.rotation.x = -Math.PI / 2
    //             tempObject.position.set(
    //                 (x - dimensionSizeX / 2) * scaleX,
    //                 -5,
    //                 (z - dimensionSizeZ / 2) * scaleZ,
    //             )
    //             tempObject.updateMatrix()
    //             ref.current.setMatrixAt(id, tempObject.matrix)
    //         }
    //     ref.current.instanceMatrix.needsUpdate = true
    // })


    return (
        <mesh material={wireframe}>
            <planeBufferGeometry attach="geometry" args={[96, 48, 96, 48]} />
        </mesh>
    )
    // return (
    //     <group>
    //         {/* <mesh material={sunsetGradient}>
    //             <sphereBufferGeometry attach="geometry" args={[96, 48]} />
    //         </mesh> */}
    //         <instancedMesh ref={ref} args={[null, null, numInstances]} >
    //             <planeBufferGeometry attach="geometry" args={[scaleX - .25, scaleZ - .25]}>
    //                 {/* <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}> */}
    //                 <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
    //                 {/* </boxBufferGeometry> */}
    //             </planeBufferGeometry>
    //             <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} />
    //         </instancedMesh>
    //     </group>
    // )
}

