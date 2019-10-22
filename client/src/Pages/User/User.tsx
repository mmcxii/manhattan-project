import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UserProps } from 'Store';
import { Card, CardHeader, CardBody } from 'Elements';
import UserInfo from './UserInfo';
import FavoritesSection from './FavoritesSection';
import FollowsAndFollowers from './FollowsAndFollowers';

interface Props {}

const User: React.FC<Props> = () => {
  const { username } = useParams();
  const [isUsersProfile, setIsUsersProfile] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<UserProps | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        // Get profile information from database
        const response: Response = await fetch(`/api/users/${username}`, { method: 'GET' });
        const data: UserProps = await response.json();

        // Compare current profile against current user info
        // If the check passes the edit profile button will be rendered
        const lsUserInfo = localStorage.getItem('userInfo');
        let profileCheck: boolean = false;
        if (lsUserInfo) {
          profileCheck = username === JSON.parse(lsUserInfo).username;
        }

        // Update state with returned information
        setIsUsersProfile(profileCheck);
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
          <Card as='section'>
            <CardHeader>{profileInfo.name || profileInfo.username}</CardHeader>
            <CardBody>
              <UserInfo profileInfo={profileInfo} isUsersProfile={isUsersProfile} />
            </CardBody>
          </Card>
          <Card as='section'>
            <CardHeader as='h3'>{`${profileInfo.name || profileInfo.username}'s cellar`}</CardHeader>
            <CardBody>
              <FavoritesSection
                highlightedFavorite={profileInfo.highlightedFavorite}
                favorites={profileInfo.favorites}
              />
            </CardBody>
          </Card>
          <Card as='section'>
            <CardHeader as='h3'>{profileInfo.name || profileInfo.username}'s connections</CardHeader>
            <CardBody>
              <FollowsAndFollowers follows={profileInfo.follows} followers={profileInfo.followers} />
            </CardBody>
          </Card>
        </>
      ) : (
        <p>Error: No User was found with that name.</p>
      )}
    </>
  );
};

export default User;
