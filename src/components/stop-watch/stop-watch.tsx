import { useCallback, useEffect, useReducer } from 'react';
import { useInterval } from './use-interval';

const FRAME_INTERVAL_MS = 1 / 60;

enum StopWatchState {
  Running,
  Paused,
}

interface StopWatchStateDefinition {
  state: StopWatchState;
  time: number;
}

enum StopWatchActionTypes {
  Start,
  Pause,
  Reset,
  Tick,
}

type StopWatchActions =
  | {
      type: StopWatchActionTypes.Start;
    }
  | {
      type: StopWatchActionTypes.Pause;
    }
  | {
      type: StopWatchActionTypes.Reset;
    }
  | {
      type: StopWatchActionTypes.Tick;
    };

function stopWatchReducer(
  state: StopWatchStateDefinition,
  action: StopWatchActions,
): StopWatchStateDefinition {
  switch (action.type) {
    case StopWatchActionTypes.Start:
      return {
        ...state,
        state: StopWatchState.Running,
      };
    case StopWatchActionTypes.Pause:
      return {
        ...state,
        state: StopWatchState.Paused,
      };
    case StopWatchActionTypes.Reset:
      return {
        state: StopWatchState.Paused,
        time: 0,
      };
    case StopWatchActionTypes.Tick:
      return {
        ...state,
        time: state.time + FRAME_INTERVAL_MS,
      };
    default:
      throw new Error(`Unsupported action type: ${action}`);
  }
}

function useStopWatchReducer(): [
  StopWatchStateDefinition,
  (action: StopWatchActions) => void,
] {
  return useReducer(stopWatchReducer, {
    state: StopWatchState.Paused,
    time: 0,
  });
}

interface StopWatchAPI {
  isRunning: boolean;
  currentTime: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

function useStopWatch(autoStart: boolean): StopWatchAPI {
  const [{ state, time: currentTime }, dispatch] = useStopWatchReducer();

  const start = useCallback(() => {
    dispatch({
      type: StopWatchActionTypes.Start,
    });
  }, [dispatch]);

  const pause = useCallback(() => {
    dispatch({
      type: StopWatchActionTypes.Pause,
    });
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch({
      type: StopWatchActionTypes.Reset,
    });
  }, [dispatch]);

  const tick = useCallback(() => {
    dispatch({
      type: StopWatchActionTypes.Tick,
    });
  }, [dispatch]);

  useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart, start]);

  useInterval(
    () => {
      if (state === StopWatchState.Running) {
        tick();
      }
    },
    state === StopWatchState.Running ? FRAME_INTERVAL_MS : null,
  );

  return {
    isRunning: state === StopWatchState.Running,
    currentTime,
    start,
    pause,
    reset,
  };
}

interface StopWatchProps {
  autoStart?: boolean;
  children: (props: StopWatchAPI) => JSX.Element;
}

export function StopWatch({
  autoStart = false,
  children,
}: StopWatchProps): JSX.Element {
  const { isRunning, currentTime, start, pause, reset } =
    useStopWatch(autoStart);

  return children({
    isRunning,
    currentTime,
    start,
    pause,
    reset,
  });
}
