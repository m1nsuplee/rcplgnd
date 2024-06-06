import { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './toggle';

/** @see https://storybook.js.org/docs/writing-stories#defining-stories */

const meta: Meta<typeof Toggle> = {
  component: Toggle,
};

export default meta;
type Story = StoryObj<typeof Toggle>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {
  render: () => <Toggle />,
};
