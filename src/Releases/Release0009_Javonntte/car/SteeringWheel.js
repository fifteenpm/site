import React, { useMemo } from 'react';
import { useFrame, useResource } from 'react-three-fiber';
import { BlackLeather12, Metal03Material } from '../../../Utils/materials';
import * as C from '../constants';

export default function SteeringWheel({ gltf, rotation }) {
    const [wheelRef, wheel] = useResource()
    const [foamGripRef, foamGrip] = useResource();
    const [blackLeatherRef, blackLeather] = useResource()
    const [metal03Ref, metal03] = useResource();

    const wheelParts = useMemo(() => {
        return gltf.__$.filter(elt => C.STEERING_WHEEL_PARTS.includes(elt.name))
    })

    const wheelMaterial = useMemo(() => {
        return {
            "gloves": foamGrip,
            "sleeves": foamGrip,
            "wheel": foamGrip,
            "wheel_internal": metal03,
        }
    })

    useFrame(() => {
        if (!wheel) return;
        wheel.rotation.z = rotation.z * .1;
    })

    return <group ref={wheelRef}>
        <Metal03Material materialRef={metal03Ref} color="black" />
        <BlackLeather12 materialRef={blackLeatherRef} color="black"     skipDisplacement />
        <meshBasicMaterial ref={foamGripRef} color="black" />
        {wheelParts.map((wheelPart, index) => {
            return <mesh
                key={index}
                name={wheelPart.name}
                material={wheelMaterial[wheelPart.name]}>
                <bufferGeometry attach="geometry" {...wheelPart.geometry} />
            </mesh>
        })}
    </group>
}