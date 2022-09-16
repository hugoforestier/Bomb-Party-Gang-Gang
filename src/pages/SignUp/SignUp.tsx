import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../../modules/SignUpForm/SignUpForm';
import TextButton from '../../components/TextButton/TextButton';
import './SignUp.scss';

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div id="sign-up">
      <h1>Create a new account</h1>
      <SignUpForm />
      <TextButton label="Sign in" onClick={() => navigate('/signin', { replace: true })} />
    </div>
  );
}
