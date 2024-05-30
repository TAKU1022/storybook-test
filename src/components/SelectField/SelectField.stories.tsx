import type { Meta, StoryObj } from '@storybook/react';
import { SelectField } from '.';

const meta = {
  component: SelectField,
  args: {
    options: [
      { value: '', label: '選択してください' },
      { value: 'A', label: 'オプションA' },
      { value: 'B', label: 'オプションB' },
      { value: 'C', label: 'オプションC' },
    ],
  },
} satisfies Meta<typeof SelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'デフォルト',
  },
};

export const Error: Story = {
  args: {
    label: 'オプション',
    isError: true,
    errorMessage: '氏名を入力してください',
    required: true,
  },
};
