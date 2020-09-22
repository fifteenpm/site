import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useResource } from 'react-three-fiber';
import Noise from '../../Common/Materials/Noise';
import { assetPath } from '../../Common/Utils/assets';
import Video from '../../Common/Materials/Video';
import {VIDEO_URL} from './constants';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ ...props }) => {
    const [loaded, setLoaded] = useState(false);

    const [videoRef, video] = useResource();
    const [noiseRef, noise] = useResource();

    const materials = {
        video,
        noise
    }

    useEffect(() => {
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
    })

    return <MaterialsContext.Provider value={{ loaded, ...materials }}>
        <Video materialRef={videoRef} side={THREE.DoubleSide} src={VIDEO_URL} play={loaded} />
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

