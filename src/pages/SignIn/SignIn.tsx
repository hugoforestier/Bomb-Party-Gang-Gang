import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../modules/AuthForm/AuthForm';
import TextButton from '../../components/TextButton/TextButton';
import './SignIn.scss';

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

  const signInButton = { label: 'Sign in' };

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
    <div id="sign-in">
      <AuthForm
        title="Log in to your account"
        inputs={signInInputs}
        submitButton={signInButton}
        onSubmit={handleSignIn}
      />
      <TextButton filled={false} label="Sign up" onClick={() => navigate('/signup', { replace: true })} />
    </div>
  );
}
