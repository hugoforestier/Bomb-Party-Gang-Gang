import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleForm from '../../components/Form/SimpleForm/SimpleForm';
import TextButton from '../../components/TextButton/TextButton';
import styles from './SignIn.module.scss';

export default function SignIn() {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const signInInputs = [
    {
      id: 'sign-in-form-login',
      label: 'Login',
      value: login,
      error: loginError,
      onChange: setLogin,
    },
    {
      id: 'sign-in-form-password',
      label: 'Password',
      value: password,
      error: passwordError,
      onChange: setPassword,
      type: 'password',
    },
  ];

  const signInButton = { label: 'Login' };

  const handleSignIn = () => {
    if (login.length === 0) {
      setLoginError('Enter your login to sign in to your account.');
    } else {
      setLoginError('');
    }
    if (password.length === 0) {
      setPasswordError('Enter your login to sign in to your account.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className={styles.signIn}>
      <SimpleForm
        title="SIGN IN"
        inputs={signInInputs}
        submitButton={signInButton}
        onSubmit={handleSignIn}
      />
      <TextButton filled={false} label="Register" onClick={() => navigate('/signup', { replace: true })} />
    </div>
  );
}
