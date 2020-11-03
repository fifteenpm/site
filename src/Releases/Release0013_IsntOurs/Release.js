import React, { useState } from 'react';
import UI from '../../Common/UI/UI';
import IsntOursCanvas from './Canvas';
import { CONTENT } from '../../Content';


export default function Release({ }) {
    const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
    return <>
        <>
            <UI
                content={CONTENT[window.location.pathname]}
                onOverlayHasBeenClosed={() => {
                    setShouldPlayVideo(true)
                }}
            />
            <IsntOursCanvas shouldPlayVideo={shouldPlayVideo} />
        </>
    </>
}
