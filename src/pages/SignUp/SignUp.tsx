import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleForm from '../../components/forms/SimpleForm/SimpleForm';
import TextButton from '../../components/buttons/TextButton/TextButton';
import styles from './SignUp.module.scss';
import Separator from '../../components/separators/Separator/Separator';
import AuthDecoration from '../../modules/AuthDecoration/AuthDecoration';

export default function SignUp() {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const signUpInputs = [
    {
      id: 'sign-up-form-login',
      label: 'Login',
      value: login,
      error: loginError,
      onChange: setLogin,
    },
    {
      id: 'sign-up-form-password',
      label: 'Password',
      value: password,
      type: 'password',
      error: passwordError,
      onChange: setPassword,
    },
  ];

  const signUpButton = { label: 'Register' };

  const handleSignUp = () => {
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
    <AuthDecoration className={styles.signUp}>
      <SimpleForm
        title="SIGN UP"
        inputs={signUpInputs}
        submitButton={signUpButton}
        onSubmit={handleSignUp}
      />
      <Separator className={styles.separator} />
      <TextButton filled={false} label="Login" onClick={() => navigate('/signin', { replace: true })} />
    </AuthDecoration>
  );
}
