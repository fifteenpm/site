import { a } from '@react-spring/three';
import React, { useEffect } from 'react';
import { useFrame, useResource } from 'react-three-fiber';
import useYScroll from '../../../Common/Scroll/useYScroll';

export default function Single({ head, complexity }) {
    const [head1y] = useYScroll([-2400, 2400], { domTarget: window });
    const [ref, headspaces] = useResource()
    const [head1GroupRef, head1Group] = useResource()
    const [head1MeshRef, head1Mesh] = useResource();

    useFrame(() => {
        if (!headspaces) return;
        headspaces.rotation.y -= .002;
        headspaces.rotation.z += .003;
    })


    return (
        <group ref={ref}>
            <a.group ref={head1GroupRef} rotation-y={head1y.to(head1y => head1y / 200)} >
                <mesh ref={head1MeshRef} material={head.material} position={[0, 0, 0.05]}  >
                    <bufferGeometry attach="geometry" {...head.geometry} />
                </mesh>
            </a.group>
        </group>
    );
}
