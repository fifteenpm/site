import { Physics } from '@react-three/cannon';
import React, { Suspense, useEffect } from "react";
import useAudioPlayer from '../../../Common/UI/Player/hooks/useAudioPlayer';
import * as C from '../constants';
import Cricket from './Cricket';
import Golf from './Golf';
import { useStore } from './hooks.js';
import Tennis from './Tennis';
import GamesCloth from './GamesCloth';
import Sun from './Sun';
// initial inspo: https://codesandbox.io/s/white-resonance-0mgum?file=/src/App.js:388-427
export default function Games({hasEnteredWorld, ...props}) {
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
            {!hasEnteredWorld && <GamesCloth />}
            {/* {hasEnteredWorld && <Sun />} */}
            <Physics
                iterations={6}
            >
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
