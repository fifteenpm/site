import React, { useMemo } from 'react';
import { CONTENT } from '../../Content';
import { AudioPlayerProvider } from '../../Common/UI/Player/AudioPlayerContext';
import { VideoPlayerProvider } from '../../Common/UI/Player/VideoPlayerContext';
import Release from './Release';
import "./index.css";

export default function Release0013_IsntOurs({ }) {
    const [audioTracks, videoTracks] = useMemo(() => {
        return [
            CONTENT[window.location.pathname].tracks,
            CONTENT[window.location.pathname].videoTracks,
        ]
    })

    return (
        <AudioPlayerProvider tracks={audioTracks}>
            <VideoPlayerProvider muted={true} volume={0} tracks={videoTracks}>
                <Release />
            </VideoPlayerProvider>
        </AudioPlayerProvider >
    );
}
