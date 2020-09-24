import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useResource, useFrame } from 'react-three-fiber';
import Noise from '../../Common/Materials/Noise';
import VideoShader from '../../Common/Materials/VideoShader'
import VideoNoiseShader from '../../Common/Materials/VideoNoiseShader'
import { assetPath } from '../../Common/Utils/assets';
import Video from '../../Common/Materials/Video';
import { VIDEO_URL } from './constants';
import facade12ColorMap from "../../Common/assets/textures/facade12/Facade12_col.jpg"
import colorSpectrumMap from '../../Common/assets/textures/env-maps/color-spectrum-original.jpg';
import { a } from '@react-spring/three'
import useYScroll from '../../Common/Scroll/useYScroll'
import { VideoPlayerContext } from '../../Common/UI/Player/VideoPlayerContext';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ shouldPlayVideo, ...props }) => {
    const [loaded, setLoaded] = useState(false);
    const [y] = useYScroll([-2400, 2400], { domTarget: window })
    const [videoRef, video] = useResource();
    const [videoNoiseRef, videoNoise] = useResource();
    const [videoShaderRef, videoShader] = useResource();
    const [videoTexture, setVideoTexture] = useState()
    // TODO
    const offset = useRef({ x: 0, y: 0 })
    const materials = {
        video,
        videoShader,
        videoNoise,
    }
    // const offset, setOffset = useState()
    useEffect(() => {
        // if (videoRef && videoRef.current) {
        //     videoRef.current.opacity = .5
        //     videoRef.current.transparent = true
        //     // const texture = new THREE.VideoTexture(videoRef.current)
        //     // texture.minFilter = THREE.LinearFilter;
        //     // texture.magFilter = THREE.LinearFilter;
        //     // texture.format = THREE.RGBFormat;
        //     setVideoTexture(videoRef.current.map)
        // }
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
        console.log("loaded", loaded)
    }, [])

    useFrame(() => {
        offset.current.x += .1
        if (offset.current.x >= .9) offset.current.x = 0.1
        // offset.current.y += .01
    })


    // platformPolishedSpeckledMarbleTop.map.offset.x -= .005;
    return <MaterialsContext.Provider value={{ loaded, ...materials }}>
        {/* <VideoPlayerContext.Provider value={value}> */}
            <Video
                materialRef={videoRef}
                side={THREE.DoubleSide}
                src={VIDEO_URL}
                // TODO (jeremy) this has potential to freeze video at enter/load time
                // TODO (jeremy) shaders wont work without useVideoTexture hook
                play={true}
            />
            {video && <Noise
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
            />}
            {video && <VideoShader
                materialRef={videoShaderRef}
                alpha={1}
                // side={THREE.DoubleSide}
                videoMaterial={video}
            />}
            {props.children}
        {/* </VideoPlayerContext.Provider> */}
    </MaterialsContext.Provider >
}

export { MaterialsContext, MaterialsProvider };

