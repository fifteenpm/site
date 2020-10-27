import React, { useMemo, useContext, useRef, useState, useEffect } from 'react';
import { MaterialsContext } from './MaterialsContext';
import { a } from '@react-spring/three';
import '../../Common/Geometries/CylinderCurvedSurfaceGeometry.js';
import useYScroll from '../../Common/Scroll/useYScroll';
import { useLoader } from 'react-three-fiber';
import { ROOM_OBJECT } from './constants'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


export default function ArrienZinghiniCurvedScreen({ width, height, width_segments = 1, height_segments = 100, }) {
    const { videoShader, videoShaderFlipY, videoShaderFlipX } = useContext(MaterialsContext);
    const [ys] = useYScroll([-2400, 2400], { domTarget: window });
    const { nodes } = useLoader(GLTFLoader, ROOM_OBJECT, loader => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco-gltf/')
        loader.setDRACOLoader(dracoLoader)
    });

    console.log("NODES", nodes)

    const sharedArgs = useMemo(() => {
        return [
            width / 2,
            height / 2,
            Math.PI,
            Math.PI * 2,
            width,
            height / 2,
        ];
    })
    return <>

        <group>
            <mesh material={videoShaderFlipY} geometry={nodes.Screen1.geometry} />
            <mesh material={videoShader} geometry={nodes.Screen2.geometry}/>
            {/* <mesh material={videoShaderFlipX} geometry={nodes.Screen3.geometry} /> */}
            {/* <mesh material={videoShaderInverted} geometry={nodes.Screen4.geometry}/> */}
            {/* <mesh material={videoShader} rotation-y={3 * Math.PI / 4}>
                <cylinderCurvedSurfaceGeometry attach="geometry" args={sharedArgs} />
            </mesh>  */}
            {/* <mesh material={videoShader} rotation-y={Math.PI / 4}>
                <cylinderCurvedSurfaceGeometry attach="geometry" args={sharedArgs} />
            </mesh> */}
            {/* <mesh material={videoShader} rotation-y={-3 * Math.PI / 4} >
                <cylinderCurvedSurfaceGeometry attach="geometry" args={sharedArgs} />
            </mesh> */}
            {/* <mesh material={videoShader} rotation-y={-Math.PI / 4}>
                <cylinderCurvedSurfaceGeometry attach="geometry" args={sharedArgs} />
            </mesh> */}
        </group>
    </>
}
