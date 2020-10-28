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
    const { videoShader, videoShaderFlipY, reflective } = useContext(MaterialsContext);
    const { nodes } = useLoader(GLTFLoader, ROOM_OBJECT, loader => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco-gltf/')
        loader.setDRACOLoader(dracoLoader)
    });
    return <>
        <group>
            {/* <mesh material={videoShaderFlipY} geometry={nodes.Screen1.geometry} /> */}
            {/* <mesh material={videoShader} geometry={nodes.Screen2.geometry} /> */}
            <mesh material={videoShader} geometry={nodes.Screen3.geometry} />
            <mesh material={videoShaderFlipY} geometry={nodes.Screen4.geometry} />
        </group>
    </>
}
