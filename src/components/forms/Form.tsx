import React from 'react';
import styles from './Form.module.scss';

interface FormProps {
  onSubmit: () => any;
  children: React.ReactNode | React.ReactNode[];
}

export default function Form({ onSubmit, children }: FormProps) {
  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        if (onSubmit) {
          onSubmit();
        }
      }}
    >
      {children}
    </form>
  );
}
