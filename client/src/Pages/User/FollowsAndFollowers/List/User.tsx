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
    <Link to={`/user/${user.username}`}>
      <h4>{user.name || user.username}</h4>
      <UserIcon user={user.name || user.username} imgSrc={user.imgUrl} withMargin />
    </Link>
  </Wrapper>
);

export default User;

const Wrapper = styled.article`
  margin: ${spacing.sm} 0;

  > a {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
  }
`;
