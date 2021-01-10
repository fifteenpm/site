import { Physics } from '@react-three/cannon';
import { default as React } from 'react';
import Game from './Game.js';
import useAudioPlayer from '../../../Common/UI/Player/hooks/useAudioPlayer';
import * as C from '../constants';

export default function Games(props) {
    return (
        <Physics
            allowSleep={false}
            // gravity={[0,-5,0]}
        >
            <Game {...props} />
        </Physics >
    );
}
