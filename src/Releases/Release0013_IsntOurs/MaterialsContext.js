import React, { useEffect, useState } from 'react';
import { useResource } from 'react-three-fiber';
import * as THREE from 'three';
import VideoShader from '../../Common/Materials/VideoShader';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ ...props }) => {
    const [loaded, setLoaded] = useState(false);
    const [videoShaderRef, videoShader] = useResource();
    const [videoShaderFlipYRef, videoShaderFlipY] = useResource();
    const [videoShaderFlipXRef, videoShaderFlipX] = useResource();

    const materials = {
        videoShader,
        videoShaderFlipY,
    }
    useEffect(() => {
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
    })

    return <MaterialsContext.Provider value={{ loaded, ...materials }}>
        <VideoShader
            materialRef={videoShaderRef}
            // side={THREE.DoubleSide}
            // offset={new THREE.Vector2(0.0, 0.5)}
        />
        <VideoShader
            materialRef={videoShaderFlipYRef}
            // side={THREE.DoubleSide}
            // offset={new THREE.Vector2(0.0, -0.5)}
            flipY={true}
        />
          <VideoShader
            materialRef={videoShaderFlipXRef}
            // side={THREE.DoubleSide}
            // offset={new THREE.Vector2(-.99,0.0)}
            flipX={true}
        />
        {props.children}
    </MaterialsContext.Provider >
}

export { MaterialsContext, MaterialsProvider };
