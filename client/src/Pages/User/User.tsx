import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UserProps } from 'Store';

interface Props {}

const User: React.FC<Props> = () => {
  const { username } = useParams();
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
      {profileInformation.name && <h2>{profileInformation.name}</h2>}
      {profileInformation.age && <small>{profileInformation.age}</small>}
      {profileInformation.bio && <p>{profileInformation.bio}</p>}
      {profileInformation.highlightedFavorite && <p>{profileInformation.highlightedFavorite}</p>}
      {profileInformation.favorites && (
        <ul>
          {profileInformation.favorites.map(fav => (
            <li>{fav}</li>
          ))}
        </ul>
      )}
      {profileInformation.follows && (
        <ul>
          {profileInformation.follows.map(follow => (
            <li>{follow.name}</li>
          ))}
        </ul>
      )}
      {profileInformation.following && (
        <ul>
          {profileInformation.following.map(follow => (
            <li>{follow.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default User;
