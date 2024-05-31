import { forwardRef } from 'react';
import styles from './TextField.module.css';

interface Props extends React.ComponentProps<'input'> {
  label?: string;
  errorMessage?: string;
}

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ label, errorMessage, ...inputProps }, ref) => {
    const id = inputProps.name;

    return (
      <div className={styles.root}>
        {!!label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {inputProps.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          {...inputProps}
          id={id}
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
