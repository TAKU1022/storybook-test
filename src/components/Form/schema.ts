import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, '氏名を入力してください'),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('有効なメールアドレスを入力してください'),
  description: z.string(),
  group: z.string().min(1, '所属グループを選択してください'),
  category: z.string().min(1, '該当カテゴリーを選択してください'),
});

export type FormSchema = z.infer<typeof schema>;
