import { useForm } from 'react-hook-form';
import { SelectField } from '../SelectField';
import { TextField } from '../TextField';
import styles from './Form.module.css';

interface FormValue {
  fullName: string;
  email: string;
  group: string;
  category: string;
  other: string;
}

interface Props {
  onSubmit: (value: FormValue) => Promise<void>;
}

export const Form: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValue>();

  return (
    <form noValidate className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formWrapper}>
        <TextField
          required
          label="氏名"
          {...register('fullName', { required: '氏名を入力してください' })}
          errorMessage={errors.fullName?.message}
        />
        <TextField
          required
          label="メールアドレス"
          {...register('email', {
            required: 'メールアドレスを入力してください',
          })}
          errorMessage={errors.email?.message}
        />
        <SelectField
          required
          label="所属グループ"
          options={[
            { value: '', label: '選択してください' },
            { value: 'groupA', label: 'グループA' },
            { value: 'groupB', label: 'グループB' },
            { value: 'groupC', label: 'グループC' },
            { value: 'groupD', label: 'グループD' },
          ]}
          {...register('group', { required: '所属グループを選択してください' })}
          errorMessage={errors.group?.message}
        />
        <SelectField
          required
          label="該当カテゴリー"
          options={[
            { value: '', label: '選択してください' },
            { value: 'categoryA', label: 'カテゴリーA' },
            { value: 'categoryB', label: 'カテゴリーB' },
            { value: 'categoryC', label: 'カテゴリーC' },
            { value: 'categoryD', label: 'カテゴリーD' },
          ]}
          {...register('category', {
            required: '該当カテゴリーを選択してください',
          })}
          errorMessage={errors.category?.message}
        />
        <TextField
          label="その他"
          {...register('other')}
          errorMessage={errors.other?.message}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.button}>送信</button>
      </div>
    </form>
  );
};
