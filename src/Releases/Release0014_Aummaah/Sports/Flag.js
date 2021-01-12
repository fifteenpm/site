
import { default as React, useContext, useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from "react-three-fiber";
import { TextureLoader } from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Cloth from '../../../Common/Utils/cloth.js';
import * as C from '../constants';
import { MaterialsContext } from '../MaterialsContext';


function ParametricCloth({ material, scale = [.1, .1, .1], position = [0, 2, -75], distance = 100, windStrength = 1, windStrengthConstant = 2, timestep = 18 / 2000, shouldSetPinAtLoadtimeHandler, ...props }) {
    const shouldSetPinHandler = shouldSetPinAtLoadtimeHandler ? shouldSetPinAtLoadtimeHandler : defaultPinHandler

    const [cloth, setCloth] = useState(null);
    const [wind, setWind] = useState(true);
    const mesh = useRef();
    const geometry = useRef();
    const { circleAlphaShader } = useContext(MaterialsContext);

    const defaultPinHandler = (u, v, xSegments, ySegment) => {
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
        const cloth = new Cloth({
            shouldSetPinHandler,
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
            </mesh>


        </group>
    );
}


function Sun({ timestep = 18 / 2000 }) {
    const [cloth, setCloth] = useState(null);
    const [wind, setWind] = useState(true);
    const [hover, setHover] = useState(false);
    const [flagMapTexture] = useLoader(TextureLoader, [C.AUMMAAH_FLAG_IMG]);
    const [flagAlphaTexture] = useLoader(TextureLoader, [C.AUMMAAH_FLAG_ALPHA_IMG]);
    const [sunMapTexture] = useLoader(TextureLoader, [C.SUN_PNG])
    const mesh = useRef();
    const geometry = useRef();
    const { nodes, } = useLoader(GLTFLoader, C.AUMMAAH_MARQUEE_GLB)
    const ref = useRef()
    const { rgbashader, orangeWireframe, circleAlphaShader, sunsetGradient, greenWireframe } = useContext(MaterialsContext);

    useEffect(() => {
        const shouldSetPin = (u, v, xSegments, ySegments) => {
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
        const cloth = new Cloth({
            shouldSetPin,
            distance: 100,
            windStrength: 1,
            // windStrengthConstant: 2
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
    //   if (flagTexture) flagTexture.anisotropy = 16;


    return (
        <group position={[0, 2, -75]}>
            <mesh
                ref={mesh}
                castShadow
                scale={[.1, .1, .1]}
                material={circleAlphaShader}
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
            </mesh>


        </group>
    );
}



function AummaahMarquee({ timestep = 18 / 2000 }) {

    const [cloth, setCloth] = useState(null);
    const [wind, setWind] = useState(true);
    const [hover, setHover] = useState(false);
    const [flagMapTexture] = useLoader(TextureLoader, [C.AUMMAAH_FLAG_IMG]);
    const [flagAlphaTexture] = useLoader(TextureLoader, [C.AUMMAAH_FLAG_ALPHA_IMG]);
    const [sunMapTexture] = useLoader(TextureLoader, [C.SUN_PNG])
    const mesh = useRef();
    const geometry = useRef();
    const { nodes, } = useLoader(GLTFLoader, C.AUMMAAH_MARQUEE_GLB)
    const ref = useRef()
    const { rgbashader, orangeWireframe, circleAlphaShader, sunsetGradient, greenWireframe } = useContext(MaterialsContext);

    useEffect(() => {
        const shouldSetPin = (u, v, xSegments, ySegments) => {
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
        const cloth = new Cloth({
            shouldSetPin,
            distance: 100,
            windStrength: 1,
            // windStrengthConstant: 2
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
    //   if (flagTexture) flagTexture.anisotropy = 16;


    return (
        <group position={[0, 2, -75]}>
            <mesh
                ref={mesh}
                castShadow
                scale={[.1, .1, .1]}
                material={rgbashader}
            >
                <parametricGeometry
                    attach="geometry"
                    args={cloth.toGeometryArgs()}
                    ref={geometry}
                    dynamic
                />
            </mesh>
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

export default function Flag() {
    return <>
        <AummaahMarquee />
        <Sun />
    </>
}
