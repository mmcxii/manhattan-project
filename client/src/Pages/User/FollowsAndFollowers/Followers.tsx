import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';

interface Props {
  followers: UserProps[] | undefined;
}

const Followers: React.FC<Props> = ({ followers }) => (
  <>
    <Title>followers</Title>
    {followers ? (
      <FollowsList>
        {followers.map(follower => (
          <FollowedUser key={follower.username}>{follower.name || follower.username}</FollowedUser>
        ))}
      </FollowsList>
    ) : (
      <p>This user is not followed by anyone yet.</p>
    )}
  </>
);

export default Followers;

const Title = styled.h4``;

const FollowsList = styled.ul``;

const FollowedUser = styled.li``;
