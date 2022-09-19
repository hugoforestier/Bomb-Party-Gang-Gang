import React, { useState } from 'react';
import './TextInput.scss';

export interface TextInputProps {
  id: string;
  label: string;
  value: string;
  type?: string;
  error?: string;
  onChange?: (str: string) => any;
}

function TextInput({
  id, label, value, type, error, onChange,
}: TextInputProps) {
  const [inputType, setInputType] = useState(type);
  const [pwdVisibilityToggler, setPwdVisibilityToggler] = useState('SHOW');

  const togglePasswordVisibility = () => {
    if (inputType === 'password') {
      setInputType('text');
      setPwdVisibilityToggler('HIDE');
    } else {
      setInputType('password');
      setPwdVisibilityToggler('SHOW');
    }
  };

  return (
    <div className="text-input">
      <label htmlFor={id} className="input-label">
        <div className="input-field-infos">
          {label}
          <div className="error-message">
            {error}
          </div>
        </div>
        <div className="input-field">
          <input
            id={id}
            name={id}
            value={value}
            type={inputType}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.value);
              }
            }}
            maxLength={15}
          />
          {type === 'password'
            ? <button type="button" onClick={togglePasswordVisibility}>{pwdVisibilityToggler}</button>
            : null}
        </div>
      </label>
    </div>
  );
}

TextInput.defaultProps = {
  type: 'text',
  error: '',
  onChange: undefined,
};

export default TextInput;
