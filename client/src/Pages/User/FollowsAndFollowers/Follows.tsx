import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';

interface Props {
  follows: UserProps[] | undefined;
}

const Follows: React.FC<Props> = ({ follows }) => (
  <>
    <Title>follows</Title>
    {follows ? (
      <FollowsList>
        {follows.map(follow => (
          <FollowedUser key={follow.username}>{follow.name || follow.username}</FollowedUser>
        ))}
      </FollowsList>
    ) : (
      <p>This user is not following anyone yet.</p>
    )}
  </>
);

export default Follows;

const Title = styled.h4``;

const FollowsList = styled.ul``;

const FollowedUser = styled.li``;
