import React, { Suspense, useEffect } from 'react';
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

export function Scene({ }) {

    const { camera, scene, raycaster, gl } = useThree()
    useEffect(() => {
        // hack to get physics to work :(
        gl.xr = { isPresenting: false }
        scene.background = new THREE.Color(0x000000);
        console.log("camera:", camera)
        // scene.background = new THREE.Color("white");
    }, [])


    const { currentTrackName } = useAudioPlayer();
    return <>
        {/* <Flying /> */}
        {/* <Orbit  autoRotate={false} maxDistance={2}/> */}
        <Orbit autoRotate={false} />
        {/* <FirstPerson /> */}
        {/* <FirstPerson autoRotate={false} heightMax={.1} heightMin={.1} heightSpeed={true} heightCoefficient={-1} /> */}
        <ambientLight intensit={.1} />
        <pointLight position={[0, 1, -5]} intensity={.5} color={"green"} />
        {/* <BloomEffect /> */}
        <MaterialsProvider>
            <Suspense fallback={null}>
                <Games {...C.TRACKS_CONFIG[currentTrackName || C.FIRST_TRACK]} />
                {/* <AummaahMarquee /> */}
                {/* <Sun /> */}
            </Suspense>
        </MaterialsProvider>
    </>
}
