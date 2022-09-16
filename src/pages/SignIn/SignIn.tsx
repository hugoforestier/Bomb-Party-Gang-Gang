import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../../modules/SignInForm/SignInForm';
import TextButton from '../../components/TextButton/TextButton';
import './SignIn.scss';

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div id="sign-in">
      <h1>Sign in to your account</h1>
      <SignInForm />
      <TextButton label="Sign up" onClick={() => navigate('/signup', { replace: true })} />
    </div>
  );
}
