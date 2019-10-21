import React from 'react';

import { useForm } from 'Hooks';
import { Form, Input, Button } from 'Elements';

interface Props {}

const Login: React.FC<Props> = () => {
  const [values, handleChange] = useForm({ username: '', password: '' });

  const attemptLogin = async () => {};

  return (
    <section>
      <Form
        onSubmit={e => {
          e.preventDefault();

          attemptLogin();
        }}
      >
        <Input name='username' value={values.username} onChange={handleChange} />
        <Input name='password' value={values.password} onChange={handleChange} />

        <Button type='submit'>Log In</Button>
      </Form>
    </section>
  );
};

export default Login;
