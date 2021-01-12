
import { default as React, useContext } from 'react';
import { MaterialsContext } from '../MaterialsContext';
import ParametricCloth from './ParametricCloth';

export default function BigCenterFlag() {
    const { rgbashader, circleAlphaShader } = useContext(MaterialsContext)
    return <>
        <ParametricCloth material={rgbashader} />
        <ParametricCloth material={circleAlphaShader} />
    </>
}
