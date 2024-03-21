import type { Meta, StoryObj } from '@storybook/react';
import { Article } from './Article';
import { Box } from '@chakra-ui/react';
import { within, expect } from '@storybook/test';

const meta = {
  component: Article,
  decorators: [
    (Story) => (
      <Box maxW={600}>
        <Story />
      </Box>
    ),
  ],
} as Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    body: 'View a summary of all your customers over the last month.',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText(args.body)).toBeVisible();
  },
};
