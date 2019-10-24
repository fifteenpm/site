import React from 'react';
import useMusicPlayer from '../../UI/Player/hooks';
import '../Release.css';
import Scene from './Scene';


export default function Canvas({ }) {
  const { isPlaying } = useMusicPlayer();
  return <Scene paused={!isPlaying} />
}




