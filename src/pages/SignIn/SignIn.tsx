import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleForm from '../../components/forms/SimpleForm/SimpleForm';
import TextButton from '../../components/buttons/TextButton/TextButton';
import styles from './SignIn.module.scss';
import Separator from '../../components/separators/Separator/Separator';
import AuthDecoration from '../../modules/AuthDecoration/AuthDecoration';
import { useAppDispatch } from '../../redux/types';
import { login } from '../../redux/reducers/login/loginReducer';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const signInInputs = [
    {
      id: 'sign-in-form-login',
      label: 'Login',
      value: username,
      error: loginError,
      onChange: setUsername,
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

  const handleErrors = () => {
    let errors = 0;
    if (username.length === 0) {
      setLoginError('Username is empty.');
      errors += 1;
    } else {
      setLoginError('');
    }
    if (password.length === 0) {
      setPasswordError('Password is empty.');
      errors += 1;
    } else {
      setPasswordError('');
    }
    return errors >= 0;
  };

  const handleSignIn = () => {
    if (handleErrors()) {
      return;
    }
    dispatch(login({
      username,
      password,
    }));
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
