import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleForm from '../../components/forms/SimpleForm/SimpleForm';
import TextButton from '../../components/buttons/TextButton/TextButton';
import styles from './SignIn.module.scss';
import Separator from '../../components/separators/Separator/Separator';
import AuthDecoration from '../../modules/AuthDecoration/AuthDecoration';

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
      setLoginError('Username is empty.');
    } else {
      setLoginError('');
    }
    if (password.length === 0) {
      setPasswordError('Password is empty.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <AuthDecoration className={styles.signIn}>
      <SimpleForm
        title="SIGN IN"
        inputs={signInInputs}
        submitButton={signInButton}
        onSubmit={handleSignIn}
      />
      <Separator className={styles.separator} />
      <TextButton filled={false} label="Register" onClick={() => navigate('/signup', { replace: true })} />
    </AuthDecoration>
  );
}
