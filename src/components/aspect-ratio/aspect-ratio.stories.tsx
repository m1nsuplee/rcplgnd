import { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './aspect-ratio';

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Example: Story = {
  render: () => {
    return (
      <div
        style={{
          width: '200px',
        }}
      >
        <AspectRatio
          ratio={16 / 9}
          as="article"
        >
          <img
            src="https://picsum.photos/seed/picsum/200/200"
            alt="Random"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </AspectRatio>
      </div>
    );
  },
};
