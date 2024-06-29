import { Meta, StoryObj } from '@storybook/react';
import { PolymorphicComponent } from './polymorphic-component';

const meta: Meta<typeof PolymorphicComponent> = {
  component: PolymorphicComponent,
};

export default meta;

type Story = StoryObj<typeof PolymorphicComponent>;

export const Default: Story = {
  render: () => {
    return (
      <PolymorphicComponent className="123">
        <div>Default</div>
      </PolymorphicComponent>
    );
  },
};

export const AsButton: Story = {
  render: () => {
    return (
      <PolymorphicComponent
        className="1234512312321"
        as="button"
        onClick={() => alert('Button clicked!')}
      >
        <span>As Button</span>
      </PolymorphicComponent>
    );
  },
};

export const AsAnchor: Story = {
  render: () => {
    return (
      <PolymorphicComponent
        className="12345"
        as="a"
        href="https://example.com"
        target="_blank"
        style={{
          color: 'red',
          backgroundColor: 'lightblue',
        }}
      >
        <span>As Anchor</span>
      </PolymorphicComponent>
    );
  },
};

export const AsCustomComponent: Story = {
  render: () => {
    const CustomComponent = ({
      onClick,
      children,
    }: {
      onClick: () => void;
      children: React.ReactNode;
    }) => {
      return (
        <div
          style={{
            backgroundColor: 'lightblue',
            padding: '1rem',
          }}
          onClick={onClick}
        >
          {children}
        </div>
      );
    };

    return (
      <PolymorphicComponent
        as={CustomComponent}
        onClick={() => alert('onClick props')}
      >
        <span>As Custom Component</span>
      </PolymorphicComponent>
    );
  },
};
