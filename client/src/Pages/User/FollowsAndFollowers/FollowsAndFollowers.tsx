import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { Card, CardHeader, CardBody } from 'Elements';
import Follows from './Follows';
import Followers from './Followers';

interface Props {
  profileInfo: UserProps;
}

const FollowsAndFollowers: React.FC<Props> = ({ profileInfo }) => (
  <Wrapper>
    <CardHeader as='h3'>{profileInfo.name || profileInfo.username}'s connections</CardHeader>
    <CardBody>
      <Follows follows={profileInfo.follows} />
      <Followers followers={profileInfo.followers} />
    </CardBody>
  </Wrapper>
);

export default FollowsAndFollowers;

const Wrapper = styled(Card).attrs({ as: 'section' })``;
