import React, { useEffect, useState } from 'react';
import { CONTENT } from '../../Content';
import useMusicPlayer from '../../UI/Player/hooks';
import UI from '../../UI/UI';
import JavonntteCanvas from './Canvas';
import * as C from './constants';
import { cloneDeep } from 'lodash';


export default function Release({ }) {
    const { playTrack, currentTrackId } = useMusicPlayer();
    const [content, setContent] = useState(cloneDeep(CONTENT[window.location.pathname]));
    const [contentReady, setContentReady] = useState(false);
    const [colorTheme, setColorTheme] = useState(C.TRACK_METADATA["679771262"].theme);

    useEffect(() => {
        setColorTheme(C.TRACK_METADATA[currentTrackId].theme);
    }, [currentTrackId])

    function onTrackSelect(trackId) {
        const metadata = C.TRACK_METADATA[trackId]
        setColorTheme(metadata.theme);
        playTrack(metadata.index)
    }

    useEffect(() => {
        content.colors = colorTheme.UIColors;
    }, [colorTheme])

    return <>{content && colorTheme &&
        <>
            <UI contentReady={contentReady} content={content} />
            <JavonntteCanvas
                setContentReady={setContentReady}
                colorTheme={colorTheme}
                onThemeSelect={onTrackSelect}
            />
        </>
    }</>
}