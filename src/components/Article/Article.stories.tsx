import type { Meta, StoryObj } from '@storybook/react';
import { Article } from './Article';
import { Box } from '@chakra-ui/react';

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

export const Default: Story = {};
