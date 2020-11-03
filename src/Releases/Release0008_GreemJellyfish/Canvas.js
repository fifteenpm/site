import React from 'react';
import useVideoPlayer from '../../Common/UI/Player/hooks/useVideoPlayer';
import '../Release.css';
import Scene from './Scene';

export default function Canvas({ }) {
  const { videoTexture } = useVideoPlayer();
  return <Scene videoTexture={videoTexture} />
}
