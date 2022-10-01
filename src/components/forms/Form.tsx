import React from 'react';

interface FormProps {
  onSubmit: () => any;
  children: React.ReactNode | React.ReactNode[];
}

export default function Form({ onSubmit, children }: FormProps) {
  return (
    <form
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
