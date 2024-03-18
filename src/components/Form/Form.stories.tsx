import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { Box } from '@chakra-ui/react';
import { fn } from '@storybook/test';

const meta = {
  component: Form,
  decorators: [
    (Story) => (
      <Box maxW={600}>
        <Story />
      </Box>
    ),
  ],
  args: { onSubmit: fn() },
} as Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
