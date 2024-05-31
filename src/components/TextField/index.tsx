import { forwardRef } from 'react';
import styles from './TextField.module.css';

interface Props extends React.ComponentProps<'input'> {
  label?: string;
  errorMessage?: string;
}

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ label, errorMessage, ...inputProps }, ref) => {
    return (
      <div className={styles.root}>
        {!!label && (
          <label htmlFor={inputProps.id} className={styles.label}>
            {label}
            {inputProps.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          {...inputProps}
          data-error={!!errorMessage}
          className={styles.input}
        />
        {!!errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
    );
  },
);
