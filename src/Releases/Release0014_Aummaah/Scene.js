import React, { Suspense, useEffect, useMemo } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import Orbit from '../../Common/Controls/Orbit';
import Flying from '../../Common/Controls/Flying';
import FirstPerson from '../../Common/Controls/FirstPerson';
import { MaterialsProvider } from './MaterialsContext.js';
import Games from './Sports/Games.js';
import { BloomEffect } from '../../Common/Effects/Effects'
import AummaahMarquee from './AummaahMarquee'
import Sun from './Sun';
import useAudioPlayer from '../../Common/UI/Player/hooks/useAudioPlayer';
import * as C from './constants';
import {isMobile} from '../../Common/Utils/BrowserDetection'

export function Scene({ }) {
    const { camera, scene, raycaster, gl } = useThree()
    const { currentTrackName } = useAudioPlayer();
    const trackProps = useMemo(() => {
        return C.TRACKS_CONFIG[currentTrackName || C.FIRST_TRACK]
    }, [currentTrackName])
    useEffect(() => {
        // hack to get physics to work :(
        // gl.xr = { isPresenting: false }
        scene.background = new THREE.Color(0x000000);
        camera.position.set(...C.CAMERA_START)
    }, [currentTrackName])


    return <>
        {!isMobile && <Orbit autoRotate={false} maxDistance={50} />}
        <pointLight position={[0, 1, -5]} intensity={.5} color={"green"} />
        {/* <BloomEffect /> */}
        <MaterialsProvider>
            <Suspense fallback={null}>
                <Games {...trackProps} />
                {/* <AummaahMarquee /> */}
                {/* <Sun /> */}
            </Suspense>
        </MaterialsProvider>
    </>
}
