import React, { useEffect, useState } from 'react';
import { useResource } from 'react-three-fiber';
import * as THREE from 'three';
import Ground29 from '../../Common/Materials/Ground29';
import VideoShader from '../../Common/Materials/VideoShader';
import SurfaceImperfections08 from '../../Common/Materials/SurfaceImperfections08';
import LinedCement from '../../Common/Materials/LinedCement';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ ...props }) => {
    const [loaded, setLoaded] = useState(false);
    const [videoShaderRef, videoShader] = useResource();
    const [ground29Ref, ground29] = useResource()
    const [surfaceImperfections08Ref, surfaceImperfections08] = useResource()
    const [linedCementRef, linedCement] = useResource()
    const materials = {
        videoShader,
        linedCement,
        // ground29,
        // surfaceImperfections08,

    }
    useEffect(() => {
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
    })

    return <MaterialsContext.Provider value={{ loaded, ...materials }}>
        <VideoShader
            materialRef={videoShaderRef}
            side={THREE.BackSide}
        />
        <Ground29
            materialRef={ground29Ref}
            side={THREE.FrontSide}
        />
        <SurfaceImperfections08
            materialRef={surfaceImperfections08Ref}
            side={THREE.BackSide}
        />
        <LinedCement materialRef={linedCementRef} side={THREE.BackSide}/>
        {props.children}
    </MaterialsContext.Provider >
}

export { MaterialsContext, MaterialsProvider };
