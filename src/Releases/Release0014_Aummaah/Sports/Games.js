import { Physics } from '@react-three/cannon';
import React, { Suspense, useEffect } from "react";
import useAudioPlayer from '../../../Common/UI/Player/hooks/useAudioPlayer';
import * as C from '../constants';
import Ball from './Ball';
import Cricket from './Cricket';
import Golf from './Golf';
import { useStore } from './hooks.js';
import { Lamp } from './Lamp';
import StartOverSurfaces from './StartOverSurfaces';
import Tennis from './Tennis';
import BigCenterFlag from './BigCenterFlag';

// initial inspo: https://codesandbox.io/s/white-resonance-0mgum?file=/src/App.js:388-427
export default function Games({hasEnteredWorld, ...props}) {
    const gameIsOn = useStore(state => state.gameIsOn)
    const { currentTrackName } = useAudioPlayer()
    const { setGameIsOn } = useStore(state => state.api)
    useEffect(() => {
        setGameIsOn(false)
        setTimeout(() => {
            setGameIsOn(true)
        }, 1000)
    }, [currentTrackName])
    return (
        <group>
            {!hasEnteredWorld && <BigCenterFlag />}
            <Physics
                iterations={6}
            >
                <Lamp />
                <StartOverSurfaces {...props.startOverSurfacesProps} />
                {gameIsOn && <Ball onInit={() => setGameIsOn(true)} {...props.ballProps} />}
                <Suspense fallback={null}>
                    <group>
                        {currentTrackName == C.AummaahTrack.Cricket && <Cricket {...props} />}
                        {currentTrackName == C.AummaahTrack.Tennis && <Tennis {...props} />}
                        {currentTrackName == C.AummaahTrack.Golf && <Golf {...props} />}
                    </group>
                </Suspense>
            </Physics >
        </group>
    );
}
