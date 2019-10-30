import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext, UserProps } from 'Store';
import { useForm } from 'Hooks';
import { Form, Input, Button, Card, CardBody, CardHeader } from 'Elements';

interface Props {}

const Login: React.FC<Props> = () => {
  const { dispatch } = useContext(UserContext);
  const [values, handleChange] = useForm({ username: '', password: '' });
  const history = useHistory();

  const attemptLogin = async () => {
    try {
      const response: Response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values })
      });
      const data: {
        token: string;
        user: {
          id: string;
          username: string;
          theme: 'dark' | 'light';
          name?: string;
          age?: number;
          bio?: string;
          follows: UserProps[];
          followers: UserProps[];
          imgUrl?: string;
        };
      } = await response.json();

      const loginToken: string = data.token;
      const userData: UserProps = {
        id: data.user.id,
        username: data.user.username,
        theme: data.user.theme,
        follows: data.user.follows,
        followers: data.user.followers
      };
      if (data.user.name) {
        userData.name = data.user.name;
      }
      if (data.user.age) {
        userData.age = data.user.age;
      }
      if (data.user.bio) {
        userData.bio = data.user.bio;
      }
      if (data.user.imgUrl) {
        userData.imgUrl = data.user.imgUrl;
      }

      localStorage.setItem('loginToken', loginToken);
      localStorage.setItem('userInfo', JSON.stringify(userData));
      dispatch({ type: 'LOG_USER_IN', payload: userData });

      return history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card as='section'>
      <CardHeader>Please log in to access the Manhattan Project</CardHeader>
      <CardBody>
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
