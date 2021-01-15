import React, { Suspense, useEffect } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';
import Orbit from '../../Common/Controls/Orbit';
import { BloomEffect } from '../../Common/Effects/Effects';
import useAudioPlayer from '../../Common/UI/Player/hooks/useAudioPlayer';
import { isMobile } from '../../Common/Utils/BrowserDetection';
import * as C from './constants';
import { MaterialsProvider } from './MaterialsContext.js';
import Games from './Sports/Games.js';
import { useStore } from './Sports/hooks';

export function Scene({ hasEnteredWorld }) {
    const { camera, scene, gl } = useThree()
    const { currentTrackName } = useAudioPlayer();
    const gameIsOn = useStore(state => state.gameIsOn)
    useEffect(() => {
        // hack to get physics to work :(
        gl.xr = { isPresenting: false }
        scene.background = new THREE.Color(0x000000);
        camera.position.set(...C.CAMERA_START)
    }, [currentTrackName])

    return <>
        {!isMobile && <Orbit autoRotate={false} maxDistance={50} />}
        <BloomEffect radius={.1} strength={2.5} />

        <MaterialsProvider>
            <Suspense fallback={null}>
                <Games hasEnteredWorld={hasEnteredWorld} />
            </Suspense>
        </MaterialsProvider>

    </>
}
