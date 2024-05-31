import { forwardRef } from 'react';
import styles from './SelectField.module.css';

interface Option {
  label: string;
  value: string;
}

interface Props extends React.ComponentProps<'select'> {
  options: Option[];
  label?: string;
  errorMessage?: string;
}

export const SelectField: React.FC<Props> = forwardRef<
  HTMLSelectElement,
  Props
>(({ options, label, errorMessage, ...selectProps }, ref) => {
  const id = selectProps.name;

  return (
    <div className={styles.root}>
      {!!label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {selectProps.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.select}>
        <select ref={ref} {...selectProps} id={id} data-error={!!errorMessage}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {!!errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
});
