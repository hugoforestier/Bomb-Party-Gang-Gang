import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleForm from '../../components/forms/SimpleForm/SimpleForm';
import TextButton from '../../components/buttons/TextButton/TextButton';
import styles from './SignIn.module.scss';
import Separator from '../../components/separators/Separator/Separator';
import AuthDecoration from '../../modules/AuthDecoration/AuthDecoration';
import { useAppDispatch, useAppSelector } from '../../redux/types';
import { login, resetLogin } from '../../redux/reducers/login/loginReducer';
import { getLoginStatus } from '../../redux/reducers/login/loginUtils';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(getLoginStatus);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [loginError, setLoginError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
    if (password.length < 5) {
      setPasswordError('Password should be at least 5 characters long.');
      errors += 1;
    } else {
      setPasswordError('');
    }
    return errors > 0;
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

  useEffect(() => {
    if (loginStatus.status === 'success') {
      navigate('/');
    } else if (loginStatus.status === 'error') {
      dispatch(resetLogin());
      if (loginStatus.error! === 401) {
        setPasswordError('Username or password is incorrect.');
      }
    }
  }, [loginStatus, dispatch, navigate]);

  return (
    <AuthDecoration className={styles.signIn}>
      <SimpleForm
        title="SIGN IN"
        inputs={signInInputs}
        submitButton={signInButton}
        onSubmit={handleSignIn}
        loading={loginStatus.status === 'loading'}
      />
      <Separator className={styles.separator} />
      <TextButton filled={false} label="Register" onClick={() => navigate('/signup', { replace: true })} />
    </AuthDecoration>
  );
}
