import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { UserProps, UserContext } from 'Store';
import { useForm } from 'Hooks';
import { Card, Form, Input, Button, CardBody, CardHeader } from 'Elements';

interface Props {}

const EditUser: React.FC<Props> = () => {
  const { username } = useParams();
  const { dispatch } = useContext(UserContext);
  //@ts-ignore
  const initialState: UserProps = JSON.parse(localStorage.getItem('userInfo'));
  //@ts-ignore
  const loginToken: string = localStorage.getItem('loginToken');
  const [values, handleChange] = useForm({
    theme: '',
    name: '',
    age: '',
    bio: '',
    highlightedFavorite: '',
    ...initialState,
  });

  const saveDataToDataBase = async () => {
    try {
      const response: Response = await fetch(`/api/users/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify(values),
      });
      const data: UserProps = await response.json();

      const userData: UserProps = {
        username: data.username,
        theme: data.theme,
        follows: data.follows,
        followers: data.followers,
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
            <Input name='name' value={values.name} onChange={handleChange} />
            <Input name='age' value={values.age} onChange={handleChange} type='number' />
            <Input name='bio' value={values.bio} onChange={handleChange} type='textarea' />
            {/* TODO: Make <Toggle /> component for toggling theme */}

            <Button type='submit'>Save Changes</Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default EditUser;
