import type { Meta, StoryObj } from '@storybook/react';
import { Mock, expect, fn, userEvent, waitFor, within } from '@storybook/test';
import { Form } from '.';

const meta = {
  component: Form,
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fullNameInput = canvas.getByLabelText(/氏名/);
    const emailInput = canvas.getByLabelText(/メールアドレス/);
    const groupSelect = canvas.getByLabelText(/所属グループ/);
    const categorySelect = canvas.getByLabelText(/該当カテゴリー/);
    const otherInput = canvas.getByLabelText(/その他/);
    const submitButton = canvas.getByRole('button', { name: '送信' });

    expect(fullNameInput).toBeVisible();
    expect(emailInput).toBeVisible();
    expect(otherInput).toBeVisible();
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

    const fullNameErrorMassage =
      await canvas.findByText('氏名を入力してください');
    const emailErrorMassage =
      await canvas.findByText('メールアドレスを入力してください');
    const groupErrorMassage =
      await canvas.findByText('所属グループを選択してください');
    const categoryErrorMassage =
      await canvas.findByText('該当カテゴリーを選択してください');

    expect(fullNameErrorMassage).toBeVisible();
    expect(emailErrorMassage).toBeVisible();
    expect(groupErrorMassage).toBeVisible();
    expect(categoryErrorMassage).toBeVisible();
  },
};

export const PlayFill: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const fullNameInput = canvas.getByLabelText(/氏名/);
    const emailInput = canvas.getByLabelText(/メールアドレス/);
    const groupSelect = canvas.getByLabelText(/所属グループ/);
    const categorySelect = canvas.getByLabelText(/該当カテゴリー/);
    const otherInput = canvas.getByLabelText(/その他/);
    const submitButton = canvas.getByRole('button', { name: '送信' });

    await userEvent.type(fullNameInput, '山田 太郎');
    await userEvent.type(emailInput, 'hoge@example.com');
    await userEvent.selectOptions(groupSelect, 'グループC');
    await userEvent.selectOptions(categorySelect, 'カテゴリーB');
    await userEvent.type(
      otherInput,
      'ああああいいいいいいいううううううううう',
    );
    await userEvent.click(submitButton);

    const onSubmit = args.onSubmit as Mock;
    const expected = {
      fullName: '山田 太郎',
      email: 'hoge@example.com',
      group: 'groupC',
      category: 'categoryB',
      other: 'ああああいいいいいいいううううううううう',
    };
    await waitFor(() => {
      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit.mock.calls[0][0]).toEqual(expected);
    });
    onSubmit.mockReset();
  },
};
