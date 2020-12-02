import React, { useEffect, useState } from 'react';
import { useResource } from 'react-three-fiber';
import TennisBall from '../../Common/Materials/TennisBall';
import LinedCement from '../../Common/Materials/LinedCement';
import {SunsetGradient} from '../../Common/Materials/SunsetGradient';
import * as THREE from 'three';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ ...props }) => {
    const [materialsLoaded, setLoaded] = useState(false);
    const [tennisBallRef, tennisBall] = useResource();
    const [tennisCourtSurfaceRef, tennisCourtSurface] = useResource();
    const [linedCementRef, linedCement] = useResource();
    const [wireframeRef, wireframe] = useResource();
    const [sunsetGradientRef, sunsetGradient] = useResource();
    const materials = {
        tennisBall,
        wireframe,
        tennisCourtSurface,
        linedCement,
        sunsetGradient,
    }
    useEffect(() => {
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
    })

    return <MaterialsContext.Provider value={{ materialsLoaded, ...materials }}>
        <TennisBall materialRef={tennisBallRef} />
        <meshBasicMaterial color="magenta" wireframe={true} ref={wireframeRef}/>
        <meshBasicMaterial color="green" ref={tennisCourtSurfaceRef} />
        <SunsetGradient materialRef={sunsetGradientRef} side={THREE.BackSide} />
        <LinedCement materialRef={linedCementRef} />
        {props.children}
    </MaterialsContext.Provider >
}

export { MaterialsContext, MaterialsProvider };
