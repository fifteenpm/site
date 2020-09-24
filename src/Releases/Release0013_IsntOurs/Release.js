import React, { useState } from 'react';
import UI from '../../Common/UI/UI';
import IsntOursCanvas from './Canvas';
import { CONTENT } from '../../Content';

export default function Release({ }) {
    const [shouldPlayVideo, setShouldStartVideo] = useState(false)
    return <>
        <>
            <UI
                content={CONTENT[window.location.pathname]}
                onOverlayHasBeenClosed={() => setShouldStartVideo(true)}
            />
            <IsntOursCanvas shouldPlayVideo={shouldPlayVideo} />
        </>
    </>
}
