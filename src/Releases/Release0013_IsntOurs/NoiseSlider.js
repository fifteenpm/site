import React, { useRef, useContext } from 'react';
import useYScroll from '../../Common/Scroll/useYScroll'
import useXScroll from '../../Common/Scroll/useXScroll'
import { a } from '@react-spring/three'
import { MaterialsContext } from './MaterialsContext'

export default function NoiseSlider({ width, height }) {
    const [y] = useYScroll([-2400, 2400], { domTarget: window })
    const [x] = useXScroll([-2400, 2400], {domTarget: window})
    const slider = useRef()
    const { noise } = useContext(MaterialsContext);
    console.log("NOSIE!" ,noise)
    return (<>
    {/* rotation-y={y.to(y => y / 200)}> */}
        {/* <a.group ref={slider} rotation-x={x.to(x=>x/20)}> */}
            <mesh material={noise} >
                {/* <sphereBufferGeometry args={[width/4, width, height]} attach="geometry" /> */}
                <planeBufferGeometry  args={[width/2, height, width*100, height*100]} attach="geometry" />
                {/* <torusBufferGeometry args={[ width/2, height/4, width*20, height*20 ]} attach="geometry" /> */}
            </mesh>
        {/* </a.group> */}
    </>)
}
