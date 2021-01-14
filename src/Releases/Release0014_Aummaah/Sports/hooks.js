import { usePointToPointConstraint } from '@react-three/cannon';
import { createRef, useCallback, useEffect } from "react";
// zustand is a minimal state-manager: https://github.com/react-spring/zustand
import create from "zustand";

// Create a store ...
// const ping = new Audio(pingSound)
export const [useStore] = create(set => ({
  // count: 0,
  gameIsOn: true,
  api: {
    setGameIsOn: gameIsOn => set({ gameIsOn })
  }
  // pong(velocity) {
  //   set({ startOver: false })
  //   ping.currentTime = 0
  //   ping.volume = clamp(velocity / 20, 0, 1)
  //   ping.play()
  //   if (velocity > 4) set(state => ({ count: state.count + 1 }))
  // },
  // reset: () => set({ startOver: true })
}))


const cursor = createRef()
// https://codesandbox.io/s/use-cannon-ragdolls-skhf8?file=/src/index.js:631-1048
export function useDragConstraint(child) {
  const [, , api] = usePointToPointConstraint(cursor, child, { pivotA: [0, 0, 0], pivotB: [0, 0, 0] })
  useEffect(() => void api.disable(), [])
  const onPointerUp = useCallback(e => api.disable(), [])
  const onPointerDown = useCallback(e => {
    e.stopPropagation()
    e.target.setPointerCapture(e.pointerId)
    api.enable()
  }, [])
  return { onPointerUp, onPointerDown }
}
