
import { default as React, useContext } from 'react';
import { MaterialsContext } from '../MaterialsContext';
import ParametricCloth from './ParametricCloth';

export default function Sun() {
    const { rgbashader, circleAlphaShader } = useContext(MaterialsContext)
    return <group>
        <ParametricCloth
            windStrength={1000}
            windStrengthConstant={8000}
            material={circleAlphaShader} />
        <ParametricCloth material={circleAlphaShader} />
    </group>
}
