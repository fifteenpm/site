import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useResource, useFrame } from 'react-three-fiber';
import Noise from '../../Common/Materials/Noise';
import { assetPath } from '../../Common/Utils/assets';
import Video from '../../Common/Materials/Video';
import { VIDEO_URL } from './constants';
import facade12ColorMap from "../../Common/assets/textures/facade12/Facade12_col.jpg"
import { a } from '@react-spring/three'
import useYScroll from '../../Common/Scroll/useYScroll'
const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ ...props }) => {
    const [loaded, setLoaded] = useState(false);
    const [y] = useYScroll([-2400, 2400], { domTarget: window })
    const [videoRef, video] = useResource();
    const [noiseRef, noise] = useResource();
    const [videoTexture, setVideoTexture] = useState()
    // TODO
    const offset = useRef({x: 0, y:0})
    const materials = {
        video,
        noise
    }
    // const offset, setOffset = useState()
    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.opacity = 1
            videoRef.current.transparent = true
            // const texture = new THREE.VideoTexture(videoRef.current)
            // texture.minFilter = THREE.LinearFilter;
            // texture.magFilter = THREE.LinearFilter;
            // texture.format = THREE.RGBFormat;
            // setVideoTexture(videoRef.current)
        }
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
    })

    useFrame(() => {
        offset.current.x  += .1
        if (offset.current.x > 1) offset.current.x = 0
        console.log("OFFSET", offset.current)
        // offset.current.y += .01
    })

   
    // platformPolishedSpeckledMarbleTop.map.offset.x -= .005;
    return <MaterialsContext.Provider value={{ loaded, ...materials }}>
        <Video
            materialRef={videoRef}
            side={THREE.DoubleSide}
            src={VIDEO_URL}
            play={loaded}
        />
        <Noise
            // map-offset-x={y.to(y=>y/20)}
            materialRef={noiseRef}
            // noiseScale={1}
            // alpha={1}
            offset={offset.current}
            side={THREE.DoubleSide}
            wireframe={false}
            // shaderMap={videoRef.current.map}
            imagePath={facade12ColorMap}
        />
        {props.children}
    </MaterialsContext.Provider>
}

export { MaterialsContext, MaterialsProvider };

