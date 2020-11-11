import React, { useEffect, useState } from 'react';
import { useResource } from 'react-three-fiber';
import TennisBall from '../../Common/Materials/TennisBall';
import LinedCement from '../../Common/Materials/LinedCement';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ ...props }) => {
    const [materialsLoaded, setLoaded] = useState(false);
    const [tennisBallRef, tennisBall] = useResource();
    const [tennisCourtSurfaceRef, tennisCourtSurface] = useResource();
    const [linedCementRef, linedCement] = useResource();
    const materials = {
        tennisBall,
        tennisCourtSurface,
        linedCement,
    }
    useEffect(() => {
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
    })

    return <MaterialsContext.Provider value={{ materialsLoaded, ...materials }}>
        <TennisBall materialRef={tennisBallRef} />
        <meshBasicMaterial color="green" ref={tennisCourtSurfaceRef} />
        <LinedCement materialRef={linedCementRef} />
        {props.children}
    </MaterialsContext.Provider >
}

export { MaterialsContext, MaterialsProvider };
