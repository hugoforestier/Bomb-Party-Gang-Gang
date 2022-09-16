import React, { useState } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import TextButton from '../../components/TextButton/TextButton';
import Form from '../../components/Form/Form';
import './LoginForm.scss';

export default function LoginForm() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log('login');
  };

  return (
    <div className="login-form">
      <Form onSubmit={handleLogin}>
        <TextInput name="login" value={login} onChange={setLogin} />
        <TextInput name="password" value={password} onChange={setPassword} type="password" />
        <TextButton label="Signin" />
      </Form>
    </div>
  );
}
