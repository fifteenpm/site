import React, { useRef, useContext, Suspense } from 'react';
import useYScroll from '../../Common/Scroll/useYScroll'
import useXScroll from '../../Common/Scroll/useXScroll'
import { a } from '@react-spring/three'
import { MaterialsContext } from './MaterialsContext'

export default function ArrienZinghiniNoiseScreen({ width, height }) {
    // const [y] = useYScroll([-2400, 2400], { domTarget: window })
    // const [x] = useXScroll([-2400, 2400], { domTarget: window })
    const slider = useRef()
    const { videoShader, videoNoise } = useContext(MaterialsContext);
    return (<>
        {/* rotation-y={y.to(y => y / 200)}> */}
        {/* <a.group ref={slider} rotation-x={x.to(x=>x/200)} rotation-y={x.to(x=>x/200)}> */}
        {/* <Suspense fallback={null}> */}
           {videoNoise && <mesh material={videoNoise} >
                {/* <sphereBufferGeometry args={[width/4, width, height]} attach="geometry" /> */}
                <planeBufferGeometry args={[width, height, width, height]} attach="geometry" />
                {/* <torusBufferGeometry args={[ width/2, height/4, width*20, height*20 ]} attach="geometry" /> */}
            </mesh>}
        {/* </Suspense> */}
        {/* </a.group> */}
    </>)
}
