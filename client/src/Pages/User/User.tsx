import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { useTitle } from 'Hooks';
import UserInfo from './UserInfo';
import FavoritesSection from './FavoritesSection';
import FollowsAndFollowers from './FollowsAndFollowers';

interface Props {}

const ErrorText = styled.p`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  margin: 2em 0;
  font-size: 1.5rem;
`;

const User: React.FC<Props> = () => {
  const { username } = useParams();
  const [profileInfo, setProfileInfo] = useState<UserProps | null>(null);
  const [displayUser, setDisplayUser] = useState<boolean>(false);
  useTitle(profileInfo ? profileInfo.name || profileInfo.username : 'Error: User not found');

  useEffect(() => {
    const getUser = async () => {
      try {
        setDisplayUser(false);
        // Get profile information from database
        const response: Response = await fetch(`/api/users/${username}`, { method: 'GET' });
        const data: UserProps = await response.json();

        setProfileInfo(data);
      } catch (err) {
        console.log(err);
      } finally {
        setDisplayUser(true);
      }
    };

    getUser();
  }, [username]);

  const profile = profileInfo ? (
    <>
      <UserInfo profileInfo={profileInfo} />

      <FavoritesSection profileInfo={profileInfo} />

      <FollowsAndFollowers profileInfo={profileInfo} />
    </>
  ) : (
    <ErrorText>No user was found with that name.</ErrorText>
  );

  return <>{displayUser && profile}</>;
};

export default User;
