import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useResource, useFrame } from 'react-three-fiber';
import Noise from '../../Common/Materials/Noise';
import VideoShader from '../../Common/Materials/VideoShader'
import { assetPath } from '../../Common/Utils/assets';
import Video from '../../Common/Materials/Video';
import { HLS_URL, MP4_URL, WEBM_URL } from './constants';
import facade12ColorMap from "../../Common/assets/textures/facade12/Facade12_col.jpg"
import colorSpectrumMap from '../../Common/assets/textures/env-maps/color-spectrum-original.jpg';
import { a } from '@react-spring/three'
import useYScroll from '../../Common/Scroll/useYScroll'
import { VideoPlayerContext } from '../../Common/UI/Player/VideoPlayerContext';
import { SOURCES } from './constants';
import { useVideoTexture } from '../../Common/Video/hooks';
import useVideoPlayer from '../../Common/UI/Player/hooks/useVideoPlayer';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ shouldPlayVideo,  videoTexture, ...props }) => {
    const [loaded, setLoaded] = useState(false);
    // const [y] = useYScroll([-2400, 2400], { domTarget: window })
    const [videoRef, video] = useResource();
    const [videoNoiseRef, videoNoise] = useResource();
    const [videoShaderRef, videoShader] = useResource();
    
    // TODO

    const materials = {
        // video,
        videoShader,
        // videoNoise,
    }
    useEffect(() => {
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
    })



    // platformPolishedSpeckledMarbleTop.map.offset.x -= .005;
    return <MaterialsContext.Provider value={{ loaded, ...materials }}>
        {/* <VideoPlayerContext.Provider value={value}> */}
        {/* <Video
            materialRef={videoRef}
            // side={THREE.DoubleSide}
            sources={{
                // TODO not using type
                hls: {
                    src: HLS_URL,
                    type: 'application/x-mpegURL',
                },
                mp4: {
                    src: MP4_URL,
                    type: 'video/mp4'
                },
                webm: {
                    src: WEBM_URL,
                    types: 'video/mp4'
                }
            }}
            shouldPlayVideo={shouldPlayVideo}
        // texture={texture}
        /> */}
        {/* {video && <Noise
                // map-offset-x={y.to(y=>y/20)}
                materialRef={videoNoiseRef}
                noiseScale={1.4}
                timeScale={.00009}
                alpha={1}
                offset={offset.current}
                side={THREE.DoubleSide}
                wireframe={false}
                videoMaterial={video}
            // imagePath={colorSpectrumMap}
            />} */}
        <VideoShader
            materialRef={videoShaderRef}
            // videoTexture={videoTexture}
            // sources={{
            //     // TODO not using type
            //     hls: {
            //         src: HLS_URL,
            //         type: 'application/x-mpegURL',
            //     },
            //     mp4: {
            //         src: MP4_URL,
            //         type: 'video/mp4'
            //     },
            //     webm: {
            //         src: WEBM_URL,
            //         types: 'video/mp4'
            //     }
            // }}
            sources={[
                // {
                //     src: HLS_URL,
                //     type: 'application/x-mpegURL',
                // },

                {
                    src: MP4_URL,
                    type: 'video/mp4'
                },

                {
                    src: WEBM_URL,
                    types: 'video/mp4'
                }
            ]}
            shouldPlayVideo={shouldPlayVideo}
            // alpha={1}
            // onVideoReady={props.onVideoReady}
            side={THREE.DoubleSide}
        />
        {props.children}
        {/* </VideoPlayerContext.Provider> */}
    </MaterialsContext.Provider >
}

export { MaterialsContext, MaterialsProvider };
