import React, { useMemo, useState } from 'react';
import { AudioPlayerProvider } from '../../Common/UI/Player/AudioPlayerContext';
import UI from '../../Common/UI/UI';
import AummaahCanvas from './Canvas';
import { CONTENT } from '../../Content';
import "./index.css";

export default function Release0014_Aummaah({ }) {
    const tracks = useMemo(() => CONTENT[window.location.pathname].tracks)
    const content = useMemo(() => CONTENT[window.location.pathname])
    const [hasEnteredWorld, setHasEnteredWorld] = useState(false);
    return (
        <AudioPlayerProvider tracks={tracks}>
            <UI content={content} onOverlayHasBeenClosed={() => setHasEnteredWorld(true)} />
            <AummaahCanvas hasEnteredWorld={hasEnteredWorld} />
        </AudioPlayerProvider >
    );
}
