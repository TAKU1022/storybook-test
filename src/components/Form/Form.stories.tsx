import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { Box } from '@chakra-ui/react';
import { within, userEvent, expect, fn, waitFor, Mock } from '@storybook/test';

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

export const Empty: Story = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nameInput = canvas.getByRole('textbox', {
      name: '氏名',
    });
    const emailInput = canvas.getByRole('textbox', {
      name: 'メールアドレス',
    });
    const groupSelect = canvas.getByRole('combobox', {
      name: '所属グループ',
    });
    const categorySelect = canvas.getByRole('combobox', {
      name: '該当カテゴリー',
    });
    const descriptionTextarea = canvas.getByRole('textbox', {
      name: '詳細内容',
    });
    const submitButton = canvas.getByRole('button', { name: '送信' });

    expect(nameInput).toBeVisible();
    expect(emailInput).toBeVisible();
    expect(descriptionTextarea).toBeVisible();
    expect(groupSelect).toBeVisible();
    expect(categorySelect).toBeVisible();
    expect(submitButton).toBeVisible();
  },
};

export const InvalidAll: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole('button', { name: '送信' });

    await userEvent.click(submitButton);

    expect(canvas.getByText('氏名を入力してください')).toBeVisible();
    expect(canvas.getByText('メールアドレスを入力してください')).toBeVisible();
    expect(canvas.getByText('所属グループを選択してください')).toBeVisible();
    expect(canvas.getByText('該当カテゴリーを選択してください')).toBeVisible();
  },
};

export const PlayFill: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const nameInput = canvas.getByRole('textbox', {
      name: '氏名',
    });
    const emailInput = canvas.getByRole('textbox', {
      name: 'メールアドレス',
    });
    const groupSelect = canvas.getByRole('combobox', {
      name: '所属グループ',
    });
    const categorySelect = canvas.getByRole('combobox', {
      name: '該当カテゴリー',
    });
    const descriptionTextarea = canvas.getByRole('textbox', {
      name: '詳細内容',
    });
    const submitButton = canvas.getByRole('button', { name: '送信' });

    await userEvent.type(nameInput, '山田 太郎');
    await userEvent.type(emailInput, 'hoge@example.com');
    await userEvent.selectOptions(groupSelect, 'グループC');
    await userEvent.selectOptions(categorySelect, 'カテゴリーB');
    await userEvent.type(
      descriptionTextarea,
      'ああああ\nいいいいいいい\nううううううううう'
    );
    await userEvent.click(submitButton);

    const onSubmit = args.onSubmit as Mock;
    const expected = {
      category: 'categoryB',
      description: 'ああああ\nいいいいいいい\nううううううううう',
      email: 'hoge@example.com',
      group: 'groupC',
      name: '山田 太郎',
    };
    await waitFor(() => {
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][0]).toEqual(expected);
    });
    onSubmit.mockReset();
  },
};
