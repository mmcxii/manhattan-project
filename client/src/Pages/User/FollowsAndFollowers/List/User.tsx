import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { spacing } from 'Utilities';
import { UserIcon } from 'Elements';

interface Props {
  user: UserProps;
}

const User: React.FC<Props> = ({ user }) => (
  <Wrapper>
    <UserIcon user={user} withMargin />
    <Link to={`/user/${user.username}`}>
      <h4>{user.name || user.username}</h4>
    </Link>
  </Wrapper>
);

export default User;

const Wrapper = styled.article`
  display: flex;
  align-items: center;
  margin: ${spacing.sm} 0;

  > a {
    text-decoration: none;
  }
`;
