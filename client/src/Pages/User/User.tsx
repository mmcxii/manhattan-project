import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { useTitle } from 'Hooks';
import UserInfo from './UserInfo';
import FavoritesSection from './FavoritesSection';
import FollowsAndFollowers from './FollowsAndFollowers';
import UserCommentList from './UserComments';

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
    let isSubscribed = true;

    const getUser = async () => {
      try {
        isSubscribed && setDisplayUser(false);
        // Get profile information from database
        const response: Response = await fetch(`/api/users/${username}`, { method: 'GET' });

        // Error finding user
        if (!response.ok) {
          isSubscribed && setProfileInfo(null);
          return;
        }

        const data: UserProps = await response.json();

        isSubscribed && setProfileInfo(data);
      } catch (err) {
        console.log(err);
      } finally {
        isSubscribed && setDisplayUser(true);
      }
    };

    getUser();

    return () => {
      isSubscribed = false;
    }
  }, [username]);

  const profile = profileInfo ? (
    <>
      <UserInfo profileInfo={profileInfo} />
      <FavoritesSection profileInfo={profileInfo} />
      <FollowsAndFollowers profileInfo={profileInfo} />
      {profileInfo.comments && profileInfo.comments.length > 0 ? <UserCommentList user={profileInfo} comments={profileInfo.comments} /> : 'This user hasn\'t commented on anything'}
    </>
  ) : (
    <ErrorText>No user was found with that name.</ErrorText>
  );

  return <>{displayUser && profile}</>;
};

export default User;
