import React from 'react';
import useVideoPlayer from '../../Common/UI/Player/hooks/useVideoPlayer';
import '../Release.css';
import Scene from './Scene';

export default function Canvas({ }) {
  const { videoMesh } = useVideoPlayer();
  return <Scene videoMesh={videoMesh} />
}
