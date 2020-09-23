import React, { useMemo, useEffect, useContext, useState } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from 'react-three-fiber';
import useAudioPlayer from '../../Common/UI/Player/hooks/useAudioPlayer';
import { MaterialsProvider } from './MaterialsContext';
import NoiseSlider from './NoiseSlider';
import ArrienZinghiniVideoScreen from './ArrienZinghiniVideoScreen';
import * as C from './constants';

// TODO (jeremy) performance: progressive downloading using something like https://github.com/davidgatti/How-to-Stream-Movies-using-NodeJS

export function Scene({ setSceneReady }) {
    const { camera, scene } = useThree();

    // global scene params
    useEffect(() => {
        camera.position.z = 7.4
        scene.background = new THREE.Color(0xffffff)
    })

    return (
        <>
            <ambientLight />
            <MaterialsProvider>
                {/* <ArrienZinghiniVideoScreen width={C.VIDEO_DIMENSIONS.x} height={C.VIDEO_DIMENSIONS.y} /> */}
                <NoiseSlider width={C.VIDEO_DIMENSIONS.x} height={C.VIDEO_DIMENSIONS.y} />
            </MaterialsProvider>
        </>
    );
}
