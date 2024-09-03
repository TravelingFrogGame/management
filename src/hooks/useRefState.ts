import { Dispatch, SetStateAction, useRef, useState } from 'react';

export default function useRefState<T>(initData: T): [T, Dispatch<SetStateAction<T>>, () => T] {
  const [state, setState] = useState<T>(initData);
  const stateRef = useRef<T>(initData);

  function poxySetState(newState: T) {
    stateRef.current = newState;
    setState(newState);
  }

  function getState() {
    return stateRef.current;
  }

  // @ts-ignore
  return [state, poxySetState, getState];
}
