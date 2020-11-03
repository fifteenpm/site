import React, { useMemo, useContext, useRef, useState, useEffect } from 'react';
import { MaterialsContext } from './MaterialsContext';
import { a } from '@react-spring/three';
import '../../Common/Geometries/CylinderCurvedSurfaceGeometry.js';
import useYScroll from '../../Common/Scroll/useYScroll';
import { useLoader } from 'react-three-fiber';
import { ROOM_OBJECT } from './constants'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export default function ArrienZinghiniCurvedScreen() {
    const { videoShader, videoShaderFlipY, reflective } = useContext(MaterialsContext);
    const { nodes } = useLoader(GLTFLoader, ROOM_OBJECT, loader => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco-gltf/')
        loader.setDRACOLoader(dracoLoader)
    });
    return <>
        <group>
            <mesh material={videoShader} geometry={nodes.Screen3.geometry} rotation-z={THREE.Math.degToRad(90)}/>
            <mesh material={videoShaderFlipY} geometry={nodes.Screen4.geometry} rotation-z={THREE.Math.degToRad(90)}/>
        </group>
    </>
}
