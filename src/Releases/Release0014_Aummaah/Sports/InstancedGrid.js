import { usePlane, useSphere } from '@react-three/cannon';
import React, { useEffect, useContext, useMemo, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import niceColors from 'nice-color-palettes'
import { MaterialsContext } from '../MaterialsContext'
import '../../../Common/Utils/GridHelper';




const tempObject = new THREE.Object3D()

const tempColor = new THREE.Color()

//https://codesandbox.io/s/r3f-instanced-colors-8fo01?from-embed
export default function InstancedGrid({ colorSelection = [0x1d592e, 0x112e17], positionY = -2, dimensionSizeZ = 66, dimensionSizeX = 66, scaleX = 2, scaleZ = 2, offsetX = 0, ...props }) {
    const numInstances = dimensionSizeZ * dimensionSizeX// * dimensionSizeY
    const colors = useMemo(() => new Array(numInstances).fill().map(() => colorSelection[Math.floor(Math.random() * 4)]))
    const { gridMaterial } = useContext(MaterialsContext)
    // const [hovered, set] = useState()
    const colorArray = useMemo(() => Float32Array.from(new Array(numInstances).fill().flatMap((_, i) => {
        return tempColor.set(colors[i]).toArray()
    })), [])

    const ref = useRef()
    // const previous = useRef()
    // useEffect(() => void (previous.current = hovered), [hovered])
    // const interval = Math.floor(Math.sqrt(numInstances))
    useEffect(() => {
        let i = 0
        for (let x = 0; x < dimensionSizeX; x++)
            // for (let y = 0; y < dimensionSizeY; y++)
            for (let z = 0; z < dimensionSizeZ; z++) {
                const id = i++
                ref.current.geometry.attributes.color.needsUpdate = true
                tempObject.rotation.x = -Math.PI / 2
                tempObject.position.set(
                    (x - dimensionSizeX / 2) * scaleX,
                    positionY,
                    (z - dimensionSizeZ / 2) * scaleZ,
                )
                tempObject.updateMatrix()
                ref.current.setMatrixAt(id, tempObject.matrix)
            }
        ref.current.instanceMatrix.needsUpdate = true
    }, [])

    return (
        <group>
            <instancedMesh ref={ref} args={[null, null, numInstances]} material={gridMaterial} position-x={offsetX} >
                <planeBufferGeometry attach="geometry" args={[scaleX - .5, scaleZ - .5]}>
                    <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
                </planeBufferGeometry>

            </instancedMesh>
        </group>
    )
}

