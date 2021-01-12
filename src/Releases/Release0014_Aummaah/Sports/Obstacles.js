import { useBox } from '@react-three/cannon';
import niceColors from 'nice-color-palettes';
import React, { useMemo } from "react";
import * as THREE from "three";

export default function Obstacles({ number = 15 }) {
    // const map = useLoader(THREE.TextureLoader, '/carbon_normal.jpg')
    const [ref] = useBox(index => ({
      mass: .02,
      position: [Math.random() - 0.5 * 5, Math.random() - 0.5, index * 2 - 40],
      // args: 1
      args: [.25, .25, .25],
  
    }))
    const colors = useMemo(() => {
      const array = new Float32Array(number * 3)
      const color = new THREE.Color()
      for (let i = 0; i < number; i++)
        color
          .set(niceColors[17][Math.floor(Math.random() * 5)])
          .convertSRGBToLinear()
          .toArray(array, i * 3)
      return array
    }, [number])
    return (
      <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, number]}>
        <sphereBufferGeometry attach="geometry" args={[1, 16, 16]}>
          <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colors, 3]} />
        </sphereBufferGeometry>
        <meshBasicMaterial attach="material" color="blue" />
        {/* <meshPhongMaterial
          attach="material"
          vertexColors={THREE.VertexColors}
          normalMap={map}
          normalScale={[1, 1]}
          normalMap-wrapS={THREE.RepeatWrapping}
          normalMap-wrapT={THREE.RepeatWrapping}
          normalMap-repeat={[10, 10]}
        /> */}
      </instancedMesh>
    )
  }
  