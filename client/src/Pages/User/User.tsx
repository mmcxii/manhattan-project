import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UserProps } from 'Store';
import { useTitle } from 'Hooks';
import UserInfo from './UserInfo';
import FavoritesSection from './FavoritesSection';
import FollowsAndFollowers from './FollowsAndFollowers';

interface Props {}

const User: React.FC<Props> = () => {
  const { username } = useParams();
  const [profileInfo, setProfileInfo] = useState<UserProps | null>(null);
  useTitle(profileInfo ? profileInfo.name || profileInfo.username : 'Error: User not found');

  useEffect(() => {
    const getUser = async () => {
      try {
        // Get profile information from database
        const response: Response = await fetch(`/api/users/${username}`, { method: 'GET' });
        const data: UserProps = await response.json();

        setProfileInfo(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [username]);

  return (
    <>
      {profileInfo ? (
        <>
          <UserInfo profileInfo={profileInfo} />

          <FavoritesSection profileInfo={profileInfo} />

          <FollowsAndFollowers profileInfo={profileInfo} />
        </>
      ) : (
        <p>Error: No User was found with that name.</p>
      )}
    </>
  );
};

export default User;
