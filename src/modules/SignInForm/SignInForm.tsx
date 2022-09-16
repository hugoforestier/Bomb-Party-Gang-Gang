import React, { useState } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import TextButton from '../../components/TextButton/TextButton';
import Form from '../../components/Form/Form';
import './SignInForm.scss';

export default function LoginForm() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = () => {
    console.log('Sign in');
  };

  return (
    <div className="sign-in-form">
      <Form onSubmit={handleSignIn}>
        <TextInput name="login" value={login} onChange={setLogin} />
        <TextInput name="password" value={password} onChange={setPassword} type="password" />
        <TextButton label="Sign in" />
      </Form>
    </div>
  );
}
