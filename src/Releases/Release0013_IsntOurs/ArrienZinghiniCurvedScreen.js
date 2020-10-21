import React, { useMemo, useContext, useRef, useState, useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { MaterialsContext } from './MaterialsContext';

export default function ArrienZinghiniFlatScreen({ width, height, width_segments = 1, height_segments = 100 }) {
    const { videoShader } = useContext(MaterialsContext);
    console.log("In the arrien component with videoShader:", videoShader)
    // // TODO plz rm me
    // const [playIt, setPlayIt] = useState(false)
    // useEffect(() => {
    //     console.log("vidoe shader state change")
    //     if (videoShader) setPlayIt(true)
    // }, [videoShader])

    // console.log("video shader", video)
    const screen = useRef();

    const curvedPlaneGeometry = useMemo(() => {
        
        const plane = new THREE.PlaneGeometry(width, height, width_segments, height_segments);
        for (let i = 0; i < plane.vertices.length / 2; i++) {
            plane.vertices[2 * i].z = Math.pow(2, i / 20);
            plane.vertices[2 * i + 1].z = Math.pow(2, i / 20);
        }
        return plane
    })




    return <>

        <group ref={screen}>
            <mesh material={videoShader} geometry={curvedPlaneGeometry} >
                {/* <planeBufferGeometry args={[width, height]} attach="geometry" /> */}
            </mesh>
        </group>

    </>


}
