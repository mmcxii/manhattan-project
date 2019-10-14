import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { spacing } from 'Utilities';
import { Button, Card } from 'Elements';

interface Props {}

const User: React.FC<Props> = () => {
  const { username } = useParams();
  const [isUsersProfile, setIsUsersProfile] = useState<boolean>(true);
  const [profileInformation, setProfileInformation] = useState<UserProps>({
    username: 'nichsecord',
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
    following: [
      { username: 'jirafaro', name: 'austin robbins' },
      { username: 'remte0', name: 'john remeto' },
    ],
  });

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const response: Response = await fetch(`/api/users/${username}`, { method: 'GET' });
  //       const data: UserProps = await response.json();

  //       setProfileInformation(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getUser();
  // }, [username]);

  return (
    <>
      <ProfileCard>
        {isUsersProfile && <Button>Edit information</Button>}
        {profileInformation.name && <h2>{profileInformation.name}</h2>}
        {profileInformation.age && <small>{profileInformation.age}</small>}
        {profileInformation.bio && <p>{profileInformation.bio}</p>}
      </ProfileCard>

      <ProfileCard>
        {profileInformation.favorites && (
          <>
            <h3>{profileInformation.name}'s cellar</h3>
            {profileInformation.highlightedFavorite && <p>{profileInformation.highlightedFavorite}</p>}
            <ul>
              {profileInformation.favorites.map(fav => (
                <li>{fav}</li>
              ))}
            </ul>
          </>
        )}
      </ProfileCard>

      <ProfileCard>
        {profileInformation.follows && (
          <>
            <h3>follows</h3>
            <ul>
              {profileInformation.follows.map(follow => (
                <li>{follow.name}</li>
              ))}
            </ul>
          </>
        )}

        {profileInformation.following && (
          <>
            <h3>following</h3>
            <ul>
              {profileInformation.following.map(follow => (
                <li>{follow.name}</li>
              ))}
            </ul>
          </>
        )}
      </ProfileCard>
    </>
  );
};

export default User;

const ProfileCard = styled(Card).attrs({ as: 'section' })`
  margin: ${spacing.lg} 0;
`;
