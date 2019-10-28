import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { ButtonLink, Card, CardHeader, CardBody, AvatarLg } from 'Elements';
import { spacing } from 'Utilities';

interface Props {
  profileInfo: UserProps;
}

const UserInfo: React.FC<Props> = ({ profileInfo }) => (
  <Wrapper>
    <CardHeader>{profileInfo.name || profileInfo.username}</CardHeader>
    <Info>
      <InfoContent>
        {profileInfo.age && <small>{profileInfo.age}</small>}
        {profileInfo.bio && <p>{profileInfo.bio}</p>}
        {profileInfo.imgUrl && <AvatarLg src={profileInfo.imgUrl} />}
      </InfoContent>
    </Info>
  </Wrapper>
);

export default UserInfo;

const Wrapper = styled(Card).attrs({ as: 'section' })``;

const Info = styled(CardBody)``;

const InfoContent = styled.div``;
