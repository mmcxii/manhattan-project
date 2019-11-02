import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { UserProps, UserContext } from 'Store';
import { useForm } from 'Hooks';
import { Button, Card, CardHeader, CardBody, Form, ErrorCard, Input } from 'Elements';

interface Props {}

const CreateUser: React.FC<Props> = () => {
  const { push } = useHistory();
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useContext(UserContext);
  const [values, handleChange] = useForm({ username: '', password: '', passwordConfirm: '' });

  const createUser = async () => {
    try {
      const { username, password } = values;
      const response: Response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const errorCodes: number[] = [400, 404, 422, 500];
      if (errorCodes.includes(response.status)) {
        const errorData: { status: number; message: string } = await response.json();

        return setError(errorData.message);
      }

      if (response.status === 200) {
        const successData: { token: string; user: UserProps } = await response.json();

        localStorage.setItem('loginToken', successData.token);
        localStorage.setItem('userInfo', JSON.stringify(successData.user));
        dispatch({ type: 'LOG_USER_IN', payload: successData.user });

        push(`/edit/${successData.user.username}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>Create an Account</CardHeader>
      <CardBody>
        <p>Please enter a username and password for your account.</p>
        {error && (
          <ErrorCard>
            <CardHeader as='h3'>Error</CardHeader>
            <CardBody>{error}</CardBody>
          </ErrorCard>
        )}
        <Form
          onSubmit={e => {
            e.preventDefault();

            if (values.password === values.passwordConfirm) {
              createUser();
            } else {
              setError('Passwords must match.');
            }
          }}
        >
          <Input
            name='username'
            value={values.username}
            onChange={handleChange}
            placeholder='Enter your desired user name'
          />
          <Input
            name='password'
            value={values.password}
            onChange={handleChange}
            type='password'
            placeholder='Enter your password'
          />
          <Input
            name='passwordConfirm'
            value={values.passwordConfirm}
            onChange={handleChange}
            type='password'
            placeholder='Please re enter your password'
            label='Confirm Password'
          />
          <Button type='submit'>Create Account</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateUser;
