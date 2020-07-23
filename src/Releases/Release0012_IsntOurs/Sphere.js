import React, { useContext, useEffect, useState } from 'react';
import useAudioPlayer from '../../Common/UI/Player/hooks/useAudioPlayer';
import * as C from './constants';
import { MaterialsContext, setMaterial } from './MaterialsContext';

export default function Sphere({ step, stepIdx }) {
    const { currentTrackName } = useAudioPlayer();
    const { purpleTron2 } = useContext(MaterialsContext);

    return (
        <>
          <mesh scale={[100, 100, 100]} position={[0, 0, 0,]} material={purpleTron2}>
              <sphereBufferGeometry attach="geometry" />
          </mesh >
        </>
    )
}
