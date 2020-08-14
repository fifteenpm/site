

import React, { useEffect, useState } from 'react';
import { useResource } from 'react-three-fiber';
import * as THREE from 'three';
import { DreamGradient } from "../Common/Materials/DreamGradient";
import FoamGrip from '../Common/Materials/FoamGrip';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ ...props }) => {
    const [loaded, setLoaded] = useState(false);

    const [foamGripPurpleRef, foamGripPurple] = useResource();
    const [dreamRef, dream] = useResource();

    const materials = {
        foamGripPurple,
        dream,
    }

    useEffect(() => {
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
    })

    return <MaterialsContext.Provider value={{ loaded, ...materials }}>
        <FoamGrip materialRef={foamGripPurpleRef} color={0xff00af} specular={0x00ff00} />
        <DreamGradient materialRef={dreamRef} side={THREE.BackSide} />
        {props.children}
    </MaterialsContext.Provider>
}

export { MaterialsContext, MaterialsProvider };

