import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import Follows from './Follows';
import Followers from './Followers';

interface Props {
  follows: UserProps[] | undefined;
  followers: UserProps[] | undefined;
}

const FollowsAndFollowers: React.FC<Props> = ({ follows, followers }) => {
  return (
    <Wrapper>
      <Follows follows={follows} />
      <Followers followers={followers} />
    </Wrapper>
  );
};

export default FollowsAndFollowers;

const Wrapper = styled.section``;
