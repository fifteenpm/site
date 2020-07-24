import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useResource } from 'react-three-fiber';
import Noise from '../../Common/Materials/Noise';
import { assetPath } from '../../Common/Utils/assets';
import Video from '../../Common/Materials/Video';
import {VIDEO_A_URL, VIDEO_B_URL} from './constants';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ ...props }) => {
    const [loaded, setLoaded] = useState(false);

    const [videoARef, videoA] = useResource();
    const [videoBRef, videoB] = useResource();
    const [noiseRef, noise] = useResource();

    const materials = {
        videoA,
        videoB,
        noise
    }

    useEffect(() => {
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
    })

    return <MaterialsContext.Provider value={{ loaded, ...materials }}>
        {/* video textures */}
        <Video materialRef={videoARef} side={THREE.DoubleSide} src={VIDEO_A_URL} play={loaded} />
        <Video materialRef={videoBRef} side={THREE.DoubleSide} src={VIDEO_B_URL} play={loaded} />
        <Noise
            materialRef={noiseRef}
            noiseScale={.35}
            alpha={.5}
            wireframe={false}
        />
        {props.children}
    </MaterialsContext.Provider>
}

export { MaterialsContext, MaterialsProvider };

