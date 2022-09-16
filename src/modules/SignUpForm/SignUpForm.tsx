import React, { useState } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import TextButton from '../../components/TextButton/TextButton';
import Form from '../../components/Form/Form';
import './SignUpForm.scss';

export default function SignUpForm() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = () => {
    console.log('Sign up');
  };

  return (
    <div id="sign-up-form">
      <Form onSubmit={handleSignUp}>
        <TextInput name="login" value={login} onChange={setLogin} />
        <TextInput name="password" value={password} onChange={setPassword} type="password" />
        <TextButton label="Sign up" />
      </Form>
    </div>
  );
}
