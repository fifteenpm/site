import React, { useContext, useEffect, useState } from 'react';
import useAudioPlayer from '../../Common/UI/Player/hooks/useAudioPlayer';
import * as C from './constants';
import { MaterialsContext, setMaterial } from './MaterialsContext';

export default function Torus({ step, stepIdx }) {
    const { currentTrackName } = useAudioPlayer();
    const [material, setMaterial] = useState()
    const { oranageTron2 } = useContext(MaterialsContext);

    return (
        <>
          <mesh scale={[10, 10, 10]} position={[0, 0, 0,]} material={oranageTron2}>
              <torusBufferGeometry args={[ 10, 3, 16, 100 ]} attach="geometry" />
          </mesh >
        </>
    )
}
