import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '.';

const meta = {
  component: TextField,
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'デフォルト',
  },
};

export const Error: Story = {
  args: {
    label: '氏名',
    isError: true,
    errorMessage: '氏名を入力してください',
    required: true,
  },
};
