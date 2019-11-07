import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext, UserProps } from 'Store';
import { useForm, useTitle } from 'Hooks';
import { Form, Input, Button, Card, CardBody, CardHeader, ErrorCard } from 'Elements';

interface Props {}

const Login: React.FC<Props> = () => {
  useTitle('Log In');
  const { dispatch } = useContext(UserContext);
  const [values, handleChange] = useForm({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const attemptLogin = async () => {
    try {
      const response: Response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values })
      });

      if (!response.ok) {
        const errorData: { status: number; message: string } = await response.json();
        setError(errorData.message);
        return ;
      } else {
        setError(null);
      }

      const data: {
        token: string;
        user: UserProps;
      } = await response.json();

      const loginToken: string = data.token;

      localStorage.setItem('loginToken', loginToken);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      dispatch({ type: 'LOG_USER_IN', payload: data.user });

      if (history.action === 'PUSH') {
        history.push('/');
        return;
      }

      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card as='section'>
      <CardHeader>Please log in to access the Manhattan Project</CardHeader>
      <CardBody>
      {error && (
          <ErrorCard>
            <CardHeader as='h3'>Error</CardHeader>
            <CardBody>{error}</CardBody>
          </ErrorCard>
        )}
        <Form
          onSubmit={e => {
            e.preventDefault();

            attemptLogin();
          }}
        >
          <Input
            name='username'
            value={values.username}
            onChange={handleChange}
            required
            placeholder='Enter your username'
            icon='fas fa-user'
          />
          <Input
            name='password'
            value={values.password}
            onChange={handleChange}
            type='password'
            required
            placeholder='Enter your password'
            icon='fas fa-lock'
          />
          <small>
            {/* * TODO: Make reset password page -> update anchor href */}
            Forgot your password? Click <a href={window.location.href}>here</a>.
          </small>
          <small>
            Click <a href='/create'>here</a> to create an account.
          </small>

          <Button type='submit'>Log In</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Login;
