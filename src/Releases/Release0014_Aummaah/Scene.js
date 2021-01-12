import React, { Suspense, useEffect, useMemo } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';
import Orbit from '../../Common/Controls/Orbit';
import { BloomEffect } from '../../Common/Effects/Effects';
import useAudioPlayer from '../../Common/UI/Player/hooks/useAudioPlayer';
import { isMobile } from '../../Common/Utils/BrowserDetection';
import * as C from './constants';
import { MaterialsProvider } from './MaterialsContext.js';
import Games from './Sports/Games.js';

export function Scene({ hasEnteredWorld }) {
    const { camera, scene } = useThree()
    const { currentTrackName } = useAudioPlayer();
    const trackProps = useMemo(() => {
        return C.TRACKS_CONFIG[currentTrackName || C.FIRST_TRACK]
    }, [currentTrackName])
    useEffect(() => {
        scene.background = new THREE.Color(0x000000);
        camera.position.set(...C.CAMERA_START)
    }, [currentTrackName])


    return <>
        {!isMobile && <Orbit autoRotate={false} maxDistance={50} />}
        <pointLight position={[0, 1, -5]} intensity={.5} color={"green"} />
        <BloomEffect />
        <MaterialsProvider>
            <Suspense fallback={null}>
                <Games hasEnteredWorld={hasEnteredWorld} {...trackProps} />
            </Suspense>
        </MaterialsProvider>
    </>
}
