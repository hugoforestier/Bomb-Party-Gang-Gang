import React from 'react';
import TextButton, { TextButtonProps } from '../../TextButton/TextButton';
import TextInput, { TextInputProps } from '../../TextInput/TextInput';
import Form from '../Form';
import styles from './SimpleForm.module.scss';

interface AuthFormProps {
  title: string;
  inputs: TextInputProps[];
  submitButton: TextButtonProps;
  onSubmit: () => any;
}

export default function SimpleForm({
  title, inputs, submitButton, onSubmit,
}: AuthFormProps) {
  return (
    <div className={styles.authForm}>
      <h1>{title}</h1>
      <Form onSubmit={onSubmit}>
        {(() => {
          const textInputs: React.ReactElement[] = [];

          inputs.forEach(({
            id, value, type, error, onChange,
          }: TextInputProps) => {
            textInputs.push(
              <TextInput
                key={id}
                id={id}
                value={value}
                type={type}
                error={error}
                onChange={onChange}
              />,
            );
          });
          return textInputs;
        })()}
        <TextButton label={submitButton.label} />
      </Form>
    </div>
  );
}
