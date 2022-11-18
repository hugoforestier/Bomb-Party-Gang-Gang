import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TextInput.module.scss';

export interface TextInputProps {
  id: string;
  label?: string;
  value: string;
  type?: string;
  error?: string;
  onChange?: (str: string) => any;
}

function TextInput({
  id, label, value, type, error, onChange,
}: TextInputProps) {
  const { t } = useTranslation();
  const [inputType, setInputType] = useState(type);
  const [pwdVisibilityToggler, setPwdVisibilityToggler] = useState(t('showPassword') as string);

  const togglePasswordVisibility = () => {
    if (inputType === 'password') {
      setInputType('text');
      setPwdVisibilityToggler(t('hidePassword'));
    } else {
      setInputType('password');
      setPwdVisibilityToggler(t('showPassword'));
    }
  };

  const onChangeFct = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  let classInputField = styles.input;
  if (type === 'password') {
    classInputField += ` ${styles.inputPassword}`;
  }

  return (
    <div className={styles.textInput}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={classInputField}>
        <input id={id} name={id} value={value} type={inputType} onChange={onChangeFct} />
        {type === 'password' ? (
          <button tabIndex={-1} type="button" onClick={togglePasswordVisibility}>
            {pwdVisibilityToggler}
          </button>
        ) : null}
      </div>
      <div className={styles.errorMessage}>{error}</div>
    </div>
  );
}

TextInput.defaultProps = {
  type: 'text',
  error: '',
  onChange: undefined,
  label: undefined,
};

export default TextInput;
