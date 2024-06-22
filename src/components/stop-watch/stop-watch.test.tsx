import { describe, expect, it } from 'vitest';
import { StopWatch } from './stop-watch';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<StopWatch>', () => {
  it('<StopWatch> 컴포넌트의 초기 currentTime은 0이다.', () => {
    const { getByTestId } = render(
      <StopWatch>
        {({ currentTime }) => (
          <span data-testid="current-time">{currentTime}</span>
        )}
      </StopWatch>,
    );

    const currentTime = getByTestId('current-time');
    expect(currentTime.textContent).toBe('0');
  });

  it('isRunning은 start를 호출하면 true가 되고, pause를 호출하면 false가 된다.', async () => {
    const { getByTestId } = render(
      <StopWatch>
        {({ isRunning, start, pause }) => (
          <button
            data-testid="stop-watch-button"
            onClick={isRunning ? pause : start}
          >
            {isRunning ? 'pause' : 'start'}
          </button>
        )}
      </StopWatch>,
    );

    const button = getByTestId('stop-watch-button');
    expect(button.textContent).toBe('start');

    await userEvent.click(button);
    expect(button.textContent).toBe('pause');

    await userEvent.click(button);
    await userEvent.click(button);
    expect(button.textContent).toBe('pause');
  });

  it('reset을 실행하면, isRunning은 false가 되고, currentTime은 0이 된다.', async () => {
    const { getByTestId } = render(
      <StopWatch>
        {({ isRunning, currentTime, start, pause, reset }) => (
          <section>
            <button
              data-testid="start-button"
              onClick={start}
            >
              Start
            </button>
            <button
              data-testid="pause-button"
              onClick={pause}
            >
              Pause
            </button>
            <button
              data-testid="reset-button"
              onClick={reset}
            >
              Reset
            </button>
            <p data-testid="current-time">{currentTime}</p>
            <div>
              <span data-testid="is-running">
                {isRunning ? 'running' : 'paused'}
              </span>
            </div>
          </section>
        )}
      </StopWatch>,
    );

    const currentTime = getByTestId('current-time');
    const startButton = getByTestId('start-button');
    const pauseButton = getByTestId('pause-button');
    const resetButton = getByTestId('reset-button');
    const isRunning = getByTestId('is-running');

    expect(currentTime.textContent).toBe('0');
    expect(isRunning.textContent).toBe('paused');

    await userEvent.click(startButton);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(currentTime.textContent).not.toBe('0');
    expect(isRunning.textContent).toBe('running');

    await userEvent.click(pauseButton);
    expect(isRunning.textContent).toBe('paused');

    await userEvent.click(startButton);
    expect(isRunning.textContent).toBe('running');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await userEvent.click(resetButton);
    expect(currentTime.textContent).toBe('0');
    expect(isRunning.textContent).toBe('paused');
  });
});
