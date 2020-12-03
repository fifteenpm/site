import { default as React, useContext, useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from "react-three-fiber";
import { DoubleSide, TextureLoader } from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import flagSrc from '../assets/flag.jpg';
import Cloth from '../../Common/Utils/cloth.js'
import * as C from './constants';
import { MaterialsContext } from './MaterialsContext';


export default function AummaahMarquee({ }) {
    const { nodes, } = useLoader(GLTFLoader, C.AUMMAAH_MARQUEE_GLB)
    const ref = useRef()
    const { orangeWireframe, sunsetGradient, magentaWireframe } = useContext(MaterialsContext);
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
    //   const [flagTexture] = useLoader(TextureLoader, [flagSrc]);
    const mesh = useRef();
    const geometry = useRef();
    const { nodes, } = useLoader(GLTFLoader, C.AUMMAAH_MARQUEE_GLB)
    const ref = useRef()
    const { orangeWireframe, sunsetGradient, magentaWireframe } = useContext(MaterialsContext);

    useEffect(() => {
        setCloth(new Cloth(2, 3));
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
        <group position={[5, 10, -50]}>
            <mesh
                ref={mesh}
                onClick={() => setWind(!wind)}
                onPointerOver={(e) => setHover(true)}
                onPointerOut={(e) => setHover(false)}
                castShadow
                scale={[.5, .5, .5]}
                material={sunsetGradient}
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
                    map={flagTexture}
                    color={hover ? 'orange' : 'white'}
                /> */}
            </mesh>

            {DEBUG &&
                cloth.particles.map((p, i) => (
                    <mesh key={i} position={p.position}>
                        <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
                        <meshStandardMaterial attach="material" color={'orange'} />
                    </mesh>
                ))}
        </group>
    );
}

