import { Meta, StoryObj } from '@storybook/react';
import { StopWatch } from './stop-watch';

const meta: Meta<typeof StopWatch> = {
  component: StopWatch,
};

export default meta;

type Story = StoryObj<typeof StopWatch>;

export const Example: Story = {
  render: () => {
    const roundToTwoDecimalPlaces = (num: number): string => {
      return num.toFixed(2);
    };

    return (
      <StopWatch>
        {({ currentTime, start, pause, reset, isRunning }) => (
          <section>
            <div>
              <span
                style={{
                  marginRight: '0.5rem',
                }}
              >
                {roundToTwoDecimalPlaces(currentTime)}
              </span>
              <button
                type="button"
                onClick={isRunning ? pause : start}
              >
                {isRunning ? 'stop' : 'start'}
              </button>
              <button
                type="button"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </section>
        )}
      </StopWatch>
    );
  },
};
