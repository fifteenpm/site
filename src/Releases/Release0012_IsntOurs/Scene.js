import React, { useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from 'react-three-fiber';
import useAudioPlayer from '../../Common/UI/Player/hooks/useAudioPlayer';
import { MaterialsProvider } from './MaterialsContext';
import Torus from './Torus';
import Sphere from './Sphere';
import * as C from './constants';

export function Scene({ setSceneReady }) {
    const { camera, scene } = useThree();
    const [step, setStep] = useState(C.TRACKS_CONFIG[C.FIRST_TRACK].steps[0]);
    const [stepIdx, setStepIdx] = useState(0);
    const [numSteps, setNumSteps] = useState(C.TRACKS_CONFIG[C.FIRST_TRACK].steps.length)

    const { currentTrackName, audioPlayer } = useAudioPlayer();

    // global scene params
    useEffect(() => {
        camera.position.z = 0
        scene.background = new THREE.Color(0xffffff)
    })

    // reset step info per track
    useEffect(() => {
        if (!currentTrackName) return;
        setNumSteps(C.TRACKS_CONFIG[currentTrackName].steps.length);
        const prevStepIdx = stepIdx
        setStepIdx(0)
        // if someone switches tracks before the step gets to step 1, need to
        // set step manually here
        if (prevStepIdx == 0) {
            setStep(C.TRACKS_CONFIG[currentTrackName].steps[stepIdx]);
        }
    }, [currentTrackName])

    // set current step
    useEffect(() => {
        if (!currentTrackName) return;
        setStep(C.TRACKS_CONFIG[currentTrackName].steps[stepIdx]);
    }, [stepIdx])

    // manage step advancement with nextStepidx
    useFrame(() => {
        if (!currentTrackName) return;
        if (stepIdx + 1 == numSteps) return;
        const nextStepIdx = stepIdx + 1;
        const nextStepTime = C.TRACKS_CONFIG[currentTrackName].steps[nextStepIdx].time
        if (audioPlayer.currentTime > nextStepTime) {
            setStepIdx(nextStepIdx)
        }
    });

    return (
        <>
            {/* <Controls /> */}
            <ambientLight />
            <MaterialsProvider>
                <Torus step={step} stepIdx={stepIdx} />
                <Sphere step={step} stepIdx={stepIdx} />
            </MaterialsProvider>
        </>
    );
}
