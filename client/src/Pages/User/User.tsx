import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UserProps } from 'Store';
import { Button, Card, CardHeader, CardBody } from 'Elements';
import FavoritesSection from './FavoritesSection';
import FollowsAndFollowers from './FollowsAndFollowers';

interface Props {}

const User: React.FC<Props> = () => {
  const { username } = useParams();
  const [isUsersProfile, setIsUsersProfile] = useState<boolean>(false);
  const [profileInformation, setProfileInformation] = useState<UserProps>({
    username: 'nichsecord',
    theme: 'dark',
    name: 'nich secord',
    age: 25,
    bio:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ipsa voluptas pariatur reprehenderit, similique at veritatis perspiciatis odio eligendi aliquam, natus unde voluptates nemo. Quibusdam, distinctio? Et nam expedita voluptatem!',
    favorites: ['bodizafa', "maker's mark", 'purple haze'],
    highlightedFavorite: 'bodizafa',
    follows: [
      { username: 'z-murph', name: 'zach murphy' },
      { username: 'brandtkstrom', name: 'brandt strom' },
    ],
    followers: [
      { username: 'jirafaro', name: 'austin robbins' },
      { username: 'remte0', name: 'john remeto' },
    ],
  });

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const response: Response = await fetch(`/api/users/${username}`, { method: 'GET' });
  //       const profileCheck: boolean = (await response.status) === 200;
  //       const data: UserProps = await response.json();

  //       setProfileInformation(data);
  //       setIsUsersProfile(profileCheck);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getUser();
  // }, [username]);

  return (
    <>
      <Card as='section'>
        <CardHeader>{profileInformation.name || profileInformation.username}</CardHeader>
        <CardBody>
          {isUsersProfile && <Button>Edit information</Button>}
          {profileInformation.age && <small>{profileInformation.age}</small>}
          {profileInformation.bio && <p>{profileInformation.bio}</p>}
        </CardBody>
      </Card>

      <Card as='section'>
        <CardHeader as='h3'>
          {`${profileInformation.name || profileInformation.username}'s cellar`}
        </CardHeader>
        <CardBody>
          <FavoritesSection
            highlightedFavorite={profileInformation.highlightedFavorite}
            favorites={profileInformation.favorites}
          />
        </CardBody>
      </Card>

      <Card as='section'>
        <CardBody>
          <FollowsAndFollowers
            follows={profileInformation.follows}
            followers={profileInformation.followers}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default User;
