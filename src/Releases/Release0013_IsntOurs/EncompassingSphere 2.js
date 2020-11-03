import React, { useContext } from 'react';
import { MaterialsContext } from './MaterialsContext';

export default function EncompassingSphere({ radius, height }) {
    const { linedCement } = useContext(MaterialsContext);
    return (
        <>
            <mesh material={linedCement} position-z={3} scale={[4,4,4]} rotation-y={-90} >
                <sphereBufferGeometry args={[radius, radius * 2, height]} attach="geometry" />
            </mesh>
        </>
    )
}
