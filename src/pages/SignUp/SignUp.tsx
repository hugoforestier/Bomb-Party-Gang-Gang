import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      label: t('username'),
      value: username,
      error: loginError,
      onChange: setUsername,
    },
    {
      id: 'sign-up-form-password',
      label: t('password'),
      value: password,
      type: 'password',
      error: passwordError,
      onChange: setPassword,
    },
  ];

  const signUpButton = { label: t('register') };

  const handleErrors = () => {
    let errors = 0;

    if (username.length === 0) {
      setLoginError(t('usernameEmpty'));
      errors += 1;
    } else {
      setLoginError('');
    }
    if (password.length < 5) {
      setPasswordError(t('shortPassword'));
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
        setLoginError(t('userAlreadyExists'));
      } else {
        setPasswordError(t('createUserError'));
      }
    }
    dispatch(resetRegister());
  }, [navigate, registerStatus, dispatch, t]);

  return (
    <AuthDecoration className={styles.signUp}>
      <div className={styles.form}>
        <SimpleForm
          title={t('signup').toUpperCase()}
          inputs={signUpInputs}
          submitButton={signUpButton}
          onSubmit={handleSignUp}
        />
        <Separator className={styles.separator} text={t('or')} />
        <TextButton filled={false} label={t('login')} onClick={() => navigate(SIGN_IN_URL)} />
      </div>
    </AuthDecoration>
  );
}
