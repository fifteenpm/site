import React, { useMemo, useEffect, useState } from 'react';
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
import { cloudEnvMap } from '../../Common/Materials/utils';
import WaterMaterial from '../../Common/Materials/WaterMaterial';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ ...props }) => {
    const [materialsLoaded, setLoaded] = useState(false);
    const [tennisBallRef, tennisBall] = useResource();
    const [linedCementRef, linedCement] = useResource();
    const [wireframeRef, wireframe] = useResource();
    const [wireframe2Ref, wireframe2] = useResource();
    const [accentWireframeRef, accentWireframe] = useResource();
    const [sunsetGradientRef, sunsetGradient] = useResource();
    const [rgbashaderRef, rgbashader] = useResource();
    const [circleAlphaShaderRef, circleAlphaShader] = useResource();
    const [naiveGlassRef, naiveGlass] = useResource()
    const [foamGripRef, foamGrip] = useResource()
    const [basicMaterialRef, basicMaterial] = useResource()
    const [gridMaterialRef, gridMaterial] = useResource()
    const [waterMaterialRef, waterMaterial] = useResource()
    const materials = {
        gridMaterial,
        naiveGlass,
        basicMaterial,
        tennisBall,
        wireframe,
        wireframe2,
        accentWireframe,
        linedCement,
        circleAlphaShader,
        sunsetGradient,
        rgbashader,
        waterMaterial,
        // foamGrip,
    }

    const envMapCube = useMemo(() => cloudEnvMap())

    useEffect(() => {
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
    })

    return <MaterialsContext.Provider value={{ materialsLoaded, ...materials }}>
        <NaiveGlass
            materialRef={naiveGlassRef}
            envMapURL={assetPath("11/textures/env-maps/old-cathedral-jamescastle-24128368@N00_49318613712.jpg")}
            receiveShadow
            castShadow
            lights
        />
        {/* <FoamGrip materialRef={foamGripRef}  color={0xff00af} specular={0x00ff00} /> */}
        <TennisBall materialRef={tennisBallRef} />
        <meshBasicMaterial receiveShadow color={0x112e17} wireframe={true} ref={wireframe2Ref} />
        <meshBasicMaterial receiveShadow color={0x112e17} wireframe={true} ref={wireframeRef} />
        <meshBasicMaterial receiveShadow color={0x112e17} wireframe={true} ref={accentWireframeRef} />

        {/* <meshBasicMaterial color={0x555555} envMap: cubeTexture /> */}
        <SunsetGradient materialRef={sunsetGradientRef} side={THREE.DoubleSide} />
        <LinedCement materialRef={linedCementRef} />
        <RGBAShader materialRef={rgbashaderRef} imagePath={C.GAMES_FLAG_IMG} side={THREE.DoubleSide} />
        <RGBAShader materialRef={circleAlphaShaderRef} imagePath={C.SUN_PNG} side={THREE.DoubleSide} />
        <meshBasicMaterial ref={basicMaterialRef} receiveShadow color="white" />
        <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors}
            ref={gridMaterialRef}
            lights
            receiveShadow
            specular={0xffffff}
            envMap={envMapCube}
        />
        <WaterMaterial materialRef={waterMaterialRef} />
        {props.children}
    </MaterialsContext.Provider >
}

export { MaterialsContext, MaterialsProvider };
