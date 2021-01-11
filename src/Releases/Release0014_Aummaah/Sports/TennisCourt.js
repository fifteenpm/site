import { usePlane, useSphere } from '@react-three/cannon';
import React, { useEffect, useContext, useMemo, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import niceColors from 'nice-color-palettes'
import { MaterialsContext } from '../MaterialsContext'
import '../../../Common/Utils/GridHelper';
import { cloudEnvMap } from '../../../Common/Materials/utils';


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

const tempObject = new THREE.Object3D()

const tempColor = new THREE.Color()

//https://codesandbox.io/s/r3f-instanced-colors-8fo01?from-embed
export default function Court({ dimensionSizeZ = 66, dimensionSizeX = 66, scaleX = 2, scaleZ = 2, ...props }) {
    const numInstances = dimensionSizeZ * dimensionSizeX// * dimensionSizeY
    const greenColors = [0x1d592e, 0x112e17]
    const colors = useMemo(() => new Array(numInstances).fill().map(() => greenColors[Math.floor(Math.random() * 4)]))
    const { sunsetGradient, greenWireframe } = useContext(MaterialsContext)
    // const [hovered, set] = useState()
    const colorArray = useMemo(() => Float32Array.from(new Array(numInstances).fill().flatMap((_, i) => {
        return tempColor.set(colors[i]).toArray()
    })), [])


    const ref = useRef()
    // const previous = useRef()
    // useEffect(() => void (previous.current = hovered), [hovered])
    const interval = Math.floor(Math.sqrt(numInstances))
    useFrame(state => {
        const elapsedTime = state.clock.getElapsedTime()
        // ref.current.rotation.x = Math.PI / 2
        // ref.current.rotation.y = Math.sin(time / 2)
        let i = 0
        for (let x = 0; x < dimensionSizeX; x++)
            // for (let y = 0; y < dimensionSizeY; y++)
            for (let z = 0; z < dimensionSizeZ; z++) {
                const id = i++
                // 1 or more
                const timeUnit = 13
                // .02 is a little offset it will skew if timeUnit is too high
                // const timeFract = Math.fractelapsedTime % timeUnit + .02 / timeUnit
                // if (((z + 1) / dimensionSizeZ) < timeFract  && x % 11 == 0) {
                //     tempColor.set("white").toArray(colorArray, id * 3)
                // } else {
                //     tempColor.set(0x0d762e).toArray(colorArray, id * 3)
                // }
                ref.current.geometry.attributes.color.needsUpdate = true
                tempObject.rotation.x = -Math.PI / 2
                tempObject.position.set(
                    (x - dimensionSizeX / 2) * scaleX,
                    -2,
                    (z - dimensionSizeZ / 2) * scaleZ,
                )
                tempObject.updateMatrix()
                ref.current.setMatrixAt(id, tempObject.matrix)
            }
        ref.current.instanceMatrix.needsUpdate = true
    })
    const envMapCube = useMemo(() => cloudEnvMap())

    // return (
    //     <mesh material={greenWireframe}>
    //         <planeBufferGeometry attach="geometry" args={[96, 48, 96, 48]} />
    //     </mesh>
    // )
    return (
        <group>
            {/* <mesh material={sunsetGradient}>
                <sphereBufferGeometry attach="geometry" args={[96, 48]} />
            </mesh> */}
            <instancedMesh ref={ref} args={[null, null, numInstances]} >
                <planeBufferGeometry attach="geometry" args={[scaleX - .5, scaleZ - .5]}>
                    {/* <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}> */}
                    <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
                    {/* </boxBufferGeometry> */}
                </planeBufferGeometry>
                {/* <meshStandardMaterial attach="material" color={"white"} transparent={false} opacity={1} /> */}
                <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors}
                    lights
                    receiveShadow
                    // castShadow
                    //  map={colorMap}
                    //  color={props.color || 0xffffff}
                    specular={props.specular || 0xf0f000}
                    // shininess={props.shininess ? props.shininess : 100,}
                    //  skinning={true}
                    //  normalMap={normalMap}
                    //  aoMap={aoMap}
                    //  specularMap={specularMap}
                    envMap={envMapCube}
                // refractionRatio={props.refractionRatio || 1.0}
                // combine={THREE.AddOperation}
                />

            </instancedMesh>
        </group>
    )
}

