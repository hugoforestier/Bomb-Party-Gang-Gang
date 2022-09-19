import React from 'react';
import Form from '../../components/Form/Form';
import TextInput, { TextInputProps } from '../../components/TextInput/TextInput';
import TextButton, { TextButtonProps } from '../../components/TextButton/TextButton';
import './AuthForm.scss';

interface AuthFormProps {
  title: string;
  inputs: TextInputProps[];
  submitButton: TextButtonProps;
  onSubmit: () => any;
}

export default function AuthForm({
  title, inputs, submitButton, onSubmit,
}: AuthFormProps) {
  return (
    <div className="auth-form">
      <h1>{title}</h1>
      <Form onSubmit={onSubmit}>
        {(() => {
          const textInputs: React.ReactElement[] = [];

          inputs.forEach(({
            id, label, value, type, error, onChange,
          }: TextInputProps) => {
            textInputs.push(
              <TextInput
                key={id}
                id={id}
                label={label}
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
