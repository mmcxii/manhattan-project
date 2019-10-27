import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UserProps, UserContext, ProductProps } from 'Store';
import { useForm } from 'Hooks';
import { Card, Form, Input, Button, CardBody, CardHeader, Toggle } from 'Elements';
interface Props {}

const EditUser: React.FC<Props> = () => {
  const { username } = useParams();
  const { dispatch } = useContext(UserContext);
  //@ts-ignore
  const initialState: UserProps = JSON.parse(localStorage.getItem('userInfo'));
  //@ts-ignore
  const loginToken: string = localStorage.getItem('loginToken');
  const [values, handleChange] = useForm({
    name: initialState.name || '',
    age: initialState.age || '',
    bio: initialState.bio || ''
  });
  const [theme, setTheme] = useState(initialState.theme);

  const saveDataToDataBase = async () => {
    try {
      const response: Response = await fetch(`/api/users/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`
        },
        body: JSON.stringify({ ...values, theme })
      });
      const data: UserProps = await response.json();

      const userData: UserProps = {
        username: data.username,
        theme: data.theme,
        follows: data.follows,
        followers: data.followers
      };
      if (data.name) {
        userData.name = data.name;
      }
      if (data.age) {
        userData.age = data.age;
      }
      if (data.bio) {
        userData.bio = data.bio;
      }

      localStorage.setItem('userInfo', JSON.stringify(userData));
      dispatch({ type: 'LOG_USER_IN', payload: userData });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card as='section'>
        <CardHeader>Edit Profile</CardHeader>
        <CardBody>
          <Form
            onSubmit={e => {
              e.preventDefault();

              saveDataToDataBase();
            }}
          >
            <Input name='name' value={values.name} onChange={handleChange} placeholder='Enter your name' />
            <Input name='age' value={values.age} onChange={handleChange} type='number' placeholder='Enter your age' />
            <Input
              name='bio'
              value={values.bio}
              onChange={handleChange}
              type='textarea'
              placeholder='Enter a short bio about yourself. What are your favorite beverages, for example?'
            />
            <Toggle
              initialState={theme === 'dark'}
              trueCondition='dark'
              falseCondition='light'
              name='theme'
              setStateAction={setTheme}
            />

            <Button type='submit'>Save Changes</Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default EditUser;
