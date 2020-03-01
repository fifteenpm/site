import React, { useEffect, useState, Suspense } from "react";
import { FixedLights } from "./lights";
import { useThree, useFrame } from "react-three-fiber";
import Frog from "./Frog";
import Murk from "./Murk";
import useAudioPlayer from "../../UI/Player/hooks/useAudioPlayer";
import { MaterialsProvider } from "./MaterialsContext";

export function Scene({}) {
  const { scene, camera } = useThree();
  // using a filter for left and right arrow press
  const [freqArray, setFreqArray] = useState();
  const { audioStream, isPlaying, bpm, currentTrackName } = useAudioPlayer();

  useEffect(() => {
    if (audioStream && !freqArray) {
      setFreqArray(new Uint8Array(audioStream.analyser.frequencyBinCount));
    }
  }, [isPlaying]);

  useFrame(() => {
    if (audioStream && freqArray) {
      audioStream.analyser.getByteFrequencyData(freqArray);
    }
  });

  return (
    <>
      <MaterialsProvider>
        <FixedLights />
        <ambientLight color={0xffffff} intensity={1.0} />
        <Suspense fallback={null}>
          <Frog
            amount={5}
            bpm={bpm}
            audioStream={audioStream}
            freqArray={freqArray}
            currentTrackName={currentTrackName}
          />
          {/* <Murk/> */}
        </Suspense>
      </MaterialsProvider>
    </>
  );
}
