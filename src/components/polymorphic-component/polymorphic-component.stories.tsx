import { Meta, StoryObj } from '@storybook/react';
import { PolymorphicComponent } from './polymorphic-component';

const meta: Meta<typeof PolymorphicComponent> = {
  component: PolymorphicComponent,
};

export default meta;

type Story = StoryObj<typeof PolymorphicComponent>;

export const Button: Story = {
  render: () => (
    <PolymorphicComponent
      as="button"
      type="submit"
    >
      am I a button?
    </PolymorphicComponent>
  ),
};

export const Link: Story = {
  render: () => (
    <PolymorphicComponent
      as="a"
      href="https://example.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      am I a link?
    </PolymorphicComponent>
  ),
};
