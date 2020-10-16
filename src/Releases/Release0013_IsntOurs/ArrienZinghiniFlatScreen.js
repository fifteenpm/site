import React, { useContext, useRef, useState, useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { MaterialsContext } from './MaterialsContext';

export default function ArrienZinghiniFlatScreen({ width, height }) {
    const { videoShader } = useContext(MaterialsContext);

    // // TODO plz rm me
    // const [playIt, setPlayIt] = useState(false)
    // useEffect(() => {
    //     console.log("vidoe shader state change")
    //     if (videoShader) setPlayIt(true)
    // }, [videoShader])

    // console.log("video shader", video)
    const screen = useRef();

    return <>

        <group ref={screen}>
            <mesh material={videoShader} >
                <planeBufferGeometry args={[width, height]} attach="geometry" />
            </mesh>
        </group>

    </>


}
