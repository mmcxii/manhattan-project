import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { Button, Card, CardHeader, CardBody } from 'Elements';

interface Props {
  isUsersProfile: boolean;
  profileInfo: UserProps;
}

const UserInfo: React.FC<Props> = ({ isUsersProfile, profileInfo }) => (
  <Wrapper>
    <CardHeader>{profileInfo.name || profileInfo.username}</CardHeader>
    <CardBody>
      {isUsersProfile && <EditProfileButton>Edit information</EditProfileButton>}
      {profileInfo.age && <small>{profileInfo.age}</small>}
      {profileInfo.bio && <p>{profileInfo.bio}</p>}
    </CardBody>
  </Wrapper>
);

export default UserInfo;

const Wrapper = styled(Card).attrs({ as: 'section' })``;

const EditProfileButton = styled(Button)`
  justify-self: flex-end;
`;
