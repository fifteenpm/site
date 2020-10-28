import React, { useEffect, useMemo, useState } from 'react';
import { useThree, useResource, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import VideoShader from '../../Common/Materials/VideoShader';

const MaterialsContext = React.createContext([{}, () => { }]);

const MaterialsProvider = ({ ...props }) => {
    const [loaded, setLoaded] = useState(false);
    const [videoShaderRef, videoShader] = useResource();
    const [videoShaderFlipYRef, videoShaderFlipY] = useResource();
    const [videoShaderFlipXRef, videoShaderFlipX] = useResource();
    const [reflectiveRef, reflective] = useResource()
    const materials = {
        videoShader,
        videoShaderFlipY,
        // reflective,
    }
    const { gl, camera, scene } = useThree();
    useEffect(() => {
        const allMats = Object.values(materials);
        const loadedMats = allMats.filter(mat => mat);
        setLoaded(allMats.length == loadedMats.length);
    })
    // const cubeCamera = useMemo(() => {
    //     const cubeCam = new THREE.CubeCamera(1, 500, 1024)
    //     // TODO (jeremy): passed in as prop
    //     const pos = new THREE.Vector3(0, 10, 0)
    //     cubeCam.position.set(pos.x, pos.y, pos.z)
    //     scene.add(cubeCam)
    //     return cubeCam
    // })

    // useFrame(() => {
    //     // mirrorCube.visible = false;
    // 	cubeCamera.update( gl, scene );
	//     // mirrorCube.visible = true;
    // })

    return <MaterialsContext.Provider value={{ loaded, ...materials }}>
        <VideoShader
            materialRef={videoShaderRef}
           side={THREE.DoubleSide}
        // offset={new THREE.Vector2(0.0, 0.5)}
        />
        <VideoShader
            materialRef={videoShaderFlipYRef}
            side={THREE.DoubleSide}
            // offset={new THREE.Vector2(0.0, -0.5)}
            flipY={true}
        />
        {/* <meshBasicMaterial
            ref={reflectiveRef}
            color={0x111111}
            side={THREE.BackSide}
            envMap={cubeCamera.renderTarget}
        /> */}
        {/* <VideoShader
            materialRef={videoShaderFlipXRef}
            // side={THREE.DoubleSide}
            // offset={new THREE.Vector2(-.99,0.0)}
            flipX={true}
        /> */}
        {props.children}
    </MaterialsContext.Provider >
}

export { MaterialsContext, MaterialsProvider };
