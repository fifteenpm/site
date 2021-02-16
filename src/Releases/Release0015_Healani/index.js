import React, { useMemo, useState } from 'react';
import { AudioPlayerProvider } from '../../Common/UI/Player/AudioPlayerContext';
import UI from '../../Common/UI/UI';
import HealaniCanvas from './Canvas';
import { CONTENT } from '../../Content';

export default function Release0015_Healani({ }) {
    const tracks = useMemo(() => CONTENT[window.location.pathname].tracks)
    const content = useMemo(() => CONTENT[window.location.pathname])
    const [hasEnteredWorld, setHasEnteredWorld] = useState(false);
    return (
        <AudioPlayerProvider tracks={tracks}>
            <UI content={content} onOverlayHasBeenClosed={() => setHasEnteredWorld(true)} />
            <HealaniCanvas hasEnteredWorld={hasEnteredWorld} />
        </AudioPlayerProvider >
    );
}
