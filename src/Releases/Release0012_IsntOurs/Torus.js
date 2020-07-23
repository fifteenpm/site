import React, { useContext, useEffect, useState } from 'react';
import useAudioPlayer from '../../Common/UI/Player/hooks/useAudioPlayer';
import * as C from './constants';
import { MaterialsContext, setMaterial } from './MaterialsContext';

export default function Torus({ step, stepIdx }) {
    const { currentTrackName } = useAudioPlayer();
    const { orangeTron2 } = useContext(MaterialsContext);

    return (
        <>
          <mesh scale={[1,1,1]} position={[10, 10, 10,]} material={orangeTron2}>
              <torusBufferGeometry args={[ 10, 3, 16, 0 ]} attach="geometry" />
          </mesh >
        </>
    )
}
