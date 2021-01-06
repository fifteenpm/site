import { Physics } from '@react-three/cannon';
import { default as React } from 'react';
import Game from './Game.js';
import useAudioPlayer from '../../../Common/UI/Player/hooks/useAudioPlayer';
import * as C from '../constants';

export default function Games() {
    const { currentTrackName } = useAudioPlayer();
    return (
        <Physics
            iterations={20}
            tolerance={0.0001}
            defaultContactMaterial={{
                friction: 0.9,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }}
            gravity={[0, -40, 0]}
            allowSleep={false}
        >
            <Game {...C.TRACKS_CONFIG[currentTrackName || C.FIRST_TRACK]} />
        </Physics >
    );
}
