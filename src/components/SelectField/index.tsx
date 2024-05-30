import styles from './SelectField.module.css';

interface Option {
  label: string;
  value: string;
}

interface Props extends React.ComponentProps<'select'> {
  options: Option[];
  label?: string;
  isError?: boolean;
  errorMessage?: string;
}

export const SelectField: React.FC<Props> = ({
  options,
  label,
  isError,
  errorMessage,
  ...selectProps
}) => {
  return (
    <div className={styles.root}>
      {!!label && (
        <label htmlFor={selectProps.id} className={styles.label}>
          {label}
          {!!selectProps.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.select}>
        <select {...selectProps} data-error={!!isError}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {!!isError && !!errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};
