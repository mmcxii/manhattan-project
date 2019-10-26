import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserProps, UserContext } from 'Store';
import { useForm } from 'Hooks';
import { Button, Card, CardHeader, CardBody, Form, Input } from 'Elements';

interface Props {}

const CreateUser: React.FC<Props> = () => {
  const { dispatch } = useContext(UserContext);
  const [values, handleChange] = useForm({ username: '', password: '', passwordConfirm: '' });

  const createUser = async () => {
    try {
      const { username, password } = values;
      const response: Response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 400) {
        // TODO: Inform user that information was missing
        return;
      }

      if (response.status === 422) {
        // TODO: Inform user that username was already taken
        return;
      }

      if (response.status === 500) {
        // TODO: Inform user that there was an error hashing the password, and that they should retry or choose a new password
        return;
      }

      if (response.status === 201) {
        const data: UserProps = await response.json();

        // TODO: Log user in and redirect to edit info page
        // WAITING ON: Backend to send token and user info on successful account creation
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
        <Form
          onSubmit={e => {
            e.preventDefault();

            if (values.password === values.passwordConfirm) {
              createUser();
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
