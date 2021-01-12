import React, { useEffect, useState } from 'react';
import { useResource } from 'react-three-fiber';
import TennisBall from '../../Common/Materials/TennisBall';
import LinedCement from '../../Common/Materials/LinedCement';
import { SunsetGradient } from '../../Common/Materials/SunsetGradient';
import * as THREE from 'three';
import RGBAShader from '../../Common/Materials/RGBAShader'
import { Camera } from 'three';
import * as C from './constants';
import sunsetGradientFragment from '!raw-loader!glslify-loader!../../Common/Shaders/sampleFragmentWithSunsetGradient.glsl'
import NaiveGlass from '../../Common/Materials/NaiveGlass'
import { assetPath } from '../../Common/Utils/assets';
import FoamGrip from '../../Common/Materials/FoamGrip';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ ...props }) => {
    const [materialsLoaded, setLoaded] = useState(false);
    const [tennisBallRef, tennisBall] = useResource();
    const [linedCementRef, linedCement] = useResource();
    const [greenWireframeRef, greenWireframe] = useResource();
    const [orangeWireframeRef, orangeWireframe] = useResource();
    const [sunsetGradientRef, sunsetGradient] = useResource();
    const [rgbashaderRef, rgbashader] = useResource();
    const [circleAlphaShaderRef, circleAlphaShader] = useResource();
    const [naiveGlassRef, naiveGlass] = useResource()
    const [foamGripRef, foamGrip] = useResource()
    const [basicMaterialRef, basicMaterial] = useResource() 

    const materials = {
        naiveGlass,
        basicMaterial,
        tennisBall,
        greenWireframe,
        linedCement,
        circleAlphaShader,
        orangeWireframe,
        sunsetGradient,
        rgbashader,
        // foamGrip,
    }
    useEffect(() => {
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
    })

    return <MaterialsContext.Provider value={{ materialsLoaded, ...materials }}>
        {/* <NaiveGlass
            materialRef={naiveGlassRef}
            envMapURL={assetPath("11/textures/env-maps/old-cathedral-jamescastle-24128368@N00_49318613712.jpg")}
        /> */}
        {/* <FoamGrip materialRef={foamGripRef}  color={0xff00af} specular={0x00ff00} /> */}
        <TennisBall materialRef={tennisBallRef} />
        <meshBasicMaterial color="orange" wireframe={true} ref={orangeWireframeRef} />
        <meshBasicMaterial color={0x112e17} wireframe={true} ref={greenWireframeRef} />
        <SunsetGradient materialRef={sunsetGradientRef} side={THREE.DoubleSide} />
        <LinedCement materialRef={linedCementRef} />
        <RGBAShader materialRef={rgbashaderRef} imagePath={C.GAMES_FLAG_IMG} side={THREE.DoubleSide} />
        <RGBAShader materialRef={circleAlphaShaderRef} imagePath={C.SUN_PNG} side={THREE.DoubleSide} />
        <meshBasicMaterial ref={basicMaterialRef} receiveShadow color="white" />
        {props.children}
    </MaterialsContext.Provider >
}

export { MaterialsContext, MaterialsProvider };
