import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../modules/AuthForm/AuthForm';
import TextButton from '../../components/TextButton/TextButton';
import styles from './SignUp.module.scss';

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

  const signUpButton = { label: 'Sign up' };

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
    <div className={styles.signUp}>
      <AuthForm
        title="SIGN UP"
        inputs={signUpInputs}
        submitButton={signUpButton}
        onSubmit={handleSignUp}
      />
      <TextButton filled={false} label="Sign in" onClick={() => navigate('/signin', { replace: true })} />
    </div>
  );
}
