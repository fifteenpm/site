import { default as React, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useLoader } from "react-three-fiber";
import { DoubleSide, TextureLoader } from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import flagSrc from '../assets/flag.jpg';
import Cloth from '../../../Common/Utils/cloth.js'
import * as C from '../constants';
import { MaterialsContext } from '../MaterialsContext';


export default function AummaahMarquee({ }) {
    const { nodes, } = useLoader(GLTFLoader, C.AUMMAAH_MARQUEE_GLB)
    const ref = useRef()
    const { orangeWireframe, sunsetGradient, greenWireframe } = useContext(MaterialsContext);
    // return (
    //     <mesh ref={ref} dispose={null} rotation-x={Math.PI / 2} position={[0, -8, -50]} scale={[20, 20, 20]}>
    //         <group>
    //             <group>
    //                 <mesh castShadow receiveShadow material={sunsetGradient} geometry={nodes.Text.geometry} />
    //             </group>
    //         </group>
    //     </mesh>
    // )
    return (
        <Flag />
    )
}



const TIMESTEP = 18 / 1000;
const DEBUG = false;

function Flag({ }) {
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
        cloth.update(TIMESTEP, geometry.current);
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
                // onClick={() => setWind(!wind)}
                // onPointerOver={(e) => setHover(true)}
                // onPointerOut={(e) => setHover(false)}
                castShadow
                scale={[.1, .1, .1]}
            material={rgbashader}
            // material={circleAlphaShader}
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

