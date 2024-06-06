/**
 * state-reducer-pattern
 * @see https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks
 */
import React from 'react';

enum ToggleActionTypes {
  TOGGLE = 'TOGGLE',
  ON = 'ON',
  OFF = 'OFF',
}

interface ToggleStateDefinition {
  on: boolean;
}

function toggleReducer(
  state: ToggleStateDefinition,
  action: { type: ToggleActionTypes },
): ToggleStateDefinition {
  switch (action.type) {
    case ToggleActionTypes.TOGGLE:
      return { ...state, on: !state.on };
    case ToggleActionTypes.ON:
      return { ...state, on: true };
    case ToggleActionTypes.OFF:
      return { ...state, on: false };
    default:
      throw new Error(`Unsupported action type: ${action}`);
  }
}

function useToggleReducer() {
  return React.useReducer(toggleReducer, { on: false });
}

function useToggle() {
  const [{ on }, dispatch] = useToggleReducer();

  const toggle = () => dispatch({ type: ToggleActionTypes.TOGGLE });
  const setOn = () => dispatch({ type: ToggleActionTypes.ON });
  const setOff = () => dispatch({ type: ToggleActionTypes.OFF });

  return { on, toggle, setOn, setOff };
}

export function Toggle() {
  const { on, toggle, setOn, setOff } = useToggle();

  return (
    <div>
      <button onClick={toggle}>toggle</button>
      <button onClick={setOn}>on</button>
      <button onClick={setOff}>off</button>
      <p>
        The button is <strong role="status">{on ? 'on' : 'off'}</strong>
      </p>
    </div>
  );
}
