import React, { useEffect, useState } from 'react';
import { useResource } from 'react-three-fiber';
import * as THREE from 'three';
import VideoShader from '../../Common/Materials/VideoShader';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ ...props }) => {
    const [loaded, setLoaded] = useState(false);
    const [videoShaderRef, videoShader] = useResource();
    const [videoShaderInvertedRef, videoShaderInverted] = useResource();

    const materials = {
        videoShader,
        videoShaderInverted,
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
            materialRef={videoShaderInvertedRef}
            // side={THREE.DoubleSide}
            // offset={new THREE.Vector2(0.0, -0.5)}
            flipY={true}
        />
        {props.children}
    </MaterialsContext.Provider >
}

export { MaterialsContext, MaterialsProvider };
