import styles from './TextField.module.css';

interface Props extends React.ComponentProps<'input'> {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
}

export const TextField: React.FC<Props> = ({
  label,
  isError,
  errorMessage,
  ...inputProps
}) => {
  return (
    <div className={styles.root}>
      {!!label && (
        <label htmlFor={inputProps.id} className={styles.label}>
          {label}
          {!!inputProps.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input {...inputProps} data-error={!!isError} className={styles.input} />
      {!!isError && !!errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};
