import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleForm from '../../components/forms/SimpleForm/SimpleForm';
import TextButton from '../../components/buttons/TextButton/TextButton';
import styles from './SignUp.module.scss';
import Separator from '../../components/separators/Separator/Separator';
import AuthDecoration from '../../modules/AuthDecoration/AuthDecoration';
import { useAppDispatch, useAppSelector } from '../../redux/types';
import { register, resetRegister } from '../../redux/reducers/login/loginReducer';
import { getRegisterStatus } from '../../redux/reducers/login/loginUtils';
import { SIGN_IN_URL } from '../../keys';

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const registerStatus = useAppSelector(getRegisterStatus);
  const [username, setUsername] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const signUpInputs = [
    {
      id: 'sign-up-form-login',
      label: 'Login',
      value: username,
      error: loginError,
      onChange: setUsername,
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

  const handleSignUp = () => {
    if (handleErrors()) {
      return;
    }
    dispatch(register({
      password,
      username,
    }));
  };

  useEffect(() => {
    if (registerStatus.status === 'success') {
      navigate(SIGN_IN_URL);
    } else if (registerStatus.status === 'error') {
      if (registerStatus.error! === 409) {
        setLoginError('User already exists');
      } else {
        setPasswordError('Couldn\'t create user');
      }
    }
    dispatch(resetRegister());
  }, [navigate, registerStatus, dispatch]);

  return (
    <AuthDecoration className={styles.signUp}>
      <div className={styles.form}>
        <SimpleForm
          title="SIGN UP"
          inputs={signUpInputs}
          submitButton={signUpButton}
          onSubmit={handleSignUp}
        />
        <Separator className={styles.separator} />
        <TextButton filled={false} label="Login" onClick={() => navigate(SIGN_IN_URL, { replace: true })} />
      </div>
    </AuthDecoration>
  );
}
