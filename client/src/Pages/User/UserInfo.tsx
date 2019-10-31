import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { Card, CardHeader, CardBody, AvatarLg } from 'Elements';

interface Props {
  profileInfo: UserProps;
}

const UserInfo: React.FC<Props> = ({ profileInfo }) => (
  <Wrapper>
    <CardHeader>{profileInfo.name || profileInfo.username}</CardHeader>
    <Info>
      <InfoContent>
        {profileInfo.imgUrl ? <AvatarLg src={profileInfo.imgUrl} /> : <AvatarLg src={''} />}
        <p>Age: {profileInfo.age && profileInfo.age}</p>
        <Card>
        <CardHeader>A little about me:</CardHeader> 
        <CardBody>{profileInfo.bio && <p>{profileInfo.bio}</p>}</CardBody>
        </Card>        
      </InfoContent>
    </Info>
  </Wrapper>
);

export default UserInfo;

const Wrapper = styled(Card).attrs({ as: 'section' })``;

const Info = styled(CardBody)``;

const InfoContent = styled.div`
display: flex;
flex-direction: column;
`;
