
import { default as React, useContext, useEffect, useRef, useState } from 'react';
import { useFrame } from "react-three-fiber";
import Cloth from '../../../Common/Utils/cloth.js';
import { MaterialsContext } from '../MaterialsContext';


function ParametricCloth({ material, scale = [.1, .1, .1], position = [0, 2, -75], distance = 100, windStrength = 1, windStrengthConstant = 2, timestep = 18 / 1000, shouldSetPinHandler = undefined, ...props }) {
    const [cloth, setCloth] = useState(null);
    const [wind, setWind] = useState(true);
    const mesh = useRef();
    const geometry = useRef();
    const { circleAlphaShader } = useContext(MaterialsContext);
    const defaultPinHandler = (u, v, xSegments, ySegments) => {
        if (
            // top
            v == ySegments ||
            // bottom middle
            (u / xSegments > .4 || u / xSegments < .6) && v == 0
        ) {
            return true
        } else {
            return false
        }
    }
    useEffect(() => {
        const shouldSetPin = shouldSetPinHandler ? shouldSetPinHandler : defaultPinHandler;
        const cloth = new Cloth({
            shouldSetPin,
            distance: distance,
            windStrength: windStrength,
            windStrengthConstant: windStrengthConstant
        })
        setCloth(cloth)
    }, []);
    useFrame(() => {
        if (!cloth || !geometry.current) return;
        cloth.windEnabled = wind;
        cloth.update(timestep, geometry.current);
        geometry.current.vertices.forEach((vertex, i) =>
            vertex.copy(cloth.particles[i].position)
        );

        geometry.current.computeFaceNormals();
        geometry.current.computeVertexNormals();
        geometry.current.computeBoundingSphere();

        geometry.current.normalsNeedUpdate = true;
        geometry.current.verticesNeedUpdate = true;
    });
    if (!cloth) return null;
    // TODO (anisotropy) important?
    // anisotropy is good for liguididty
    //   if (flagTexture) flagTexture.anisotropy = 16;
    return (
        <group position={position}>
            <mesh
                ref={mesh}
                castShadow
                scale={scale}
                material={material || circleAlphaShader}
            >
                <parametricGeometry
                    attach="geometry"
                    args={cloth.toGeometryArgs()}
                    ref={geometry}
                    dynamic
                />
                {/* <meshLambertMaterial
                    attach="material"
                    side={DoubleSide}
                    map={flagMapTexture}
                    // alphaMap={flagAlphaTexture}
                    color={hover ? 'orange' : 'white'}
                /> */}
            </mesh>Î
        </group>
    );
}

export function BigCenterFlag() {
    const { rgbashader, circleAlphaShader } = useContext(MaterialsContext)
    return <>
        <ParametricCloth material={rgbashader} />
        <ParametricCloth material={circleAlphaShader} />
    </>
}
