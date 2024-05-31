import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Form } from '.';

const meta = {
  component: Form,
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
