import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UserProps, UserContext } from 'Store';
import { useForm, useTitle } from 'Hooks';
import { Card, Form, Input, Button, CardBody, CardHeader, Toggle, AvatarUpdater } from 'Elements';

interface Props {}

const EditUser: React.FC<Props> = () => {
  const { username } = useParams();
  const { user, dispatch } = useContext(UserContext);
  useTitle(`${user.name || user.username} - Edit Information`);
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

      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch({ type: 'LOG_USER_IN', payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card as='section'>
        <CardHeader>Edit Avatar</CardHeader>
        <CardBody>
          <AvatarUpdater />
        </CardBody>
      </Card>
      <Card as='section'>
        <CardHeader>Edit Information</CardHeader>
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
