import React from 'react';
import './TextInput.scss';

interface TextInputProps {
  name: string;
  value: string;
  type?: string;
  onChange?: (str: string) => any;
}

function TextInput({
  name, value, type, onChange,
}: TextInputProps) {
  return (
    <label htmlFor={name} className="label-wrapper">
      {name}
      <input
        className="text-input"
        name={name}
        value={value}
        type={type}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
      />
    </label>
  );
}

TextInput.defaultProps = {
  type: 'text',
  onChange: undefined,
};

export default TextInput;
