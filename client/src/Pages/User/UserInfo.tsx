import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { spacing } from 'Utilities';
import { Card, CardHeader, CardBody, AvatarLg, FollowButton } from 'Elements';
import placeholder from 'Assets/img/placeholder.png';

interface Props {
  profileInfo: UserProps;
}

const UserInfo: React.FC<Props> = ({ profileInfo }) => (
  <Wrapper>
    <CardHeader>{profileInfo.name || profileInfo.username}</CardHeader>
    <Info hasBio={profileInfo.bio !== undefined}>
      <FollowButton followTarget={profileInfo} />

      <ProfilePicture src={profileInfo.imgUrl || placeholder} alt={profileInfo.name || profileInfo.username} />

      <InfoContent>
        <Card>
          <CardHeader as='h3'>About {profileInfo.name || profileInfo.username}:</CardHeader>
          <CardBody>{profileInfo.age && <p>Age: {profileInfo.age}</p>}</CardBody>
        </Card>
      </InfoContent>

      {profileInfo.bio && (
        <Bio>
          <CardHeader as='h3'>Bio</CardHeader>
          <CardBody>
            <p>{profileInfo.bio}</p>
          </CardBody>
        </Bio>
      )}
    </Info>
  </Wrapper>
);

export default UserInfo;

const Wrapper = styled(Card).attrs({ as: 'section' })``;

const Info = styled(CardBody)<{ hasBio: boolean }>`
  display: grid;
  grid-template-rows: repeat(2, max-content) 1fr;
  grid-template-areas:
    'follow'
    'picture'
    'info'
    ${props => props.hasBio && `'bio'`};
  grid-gap: ${spacing.sm};

  @media screen and (min-width: 768px) {
    grid-template-rows: max-content 1fr;
    grid-template-columns: max-content 1fr max-content;
    grid-template-areas:
      'picture . follow'
      'picture info info'
      ${props => props.hasBio && `'bio bio bio'`};
  }
`;

const Bio = styled(Card)`
  grid-area: bio;
`;

const ProfilePicture = styled(AvatarLg)`
  grid-area: picture;

  margin: auto;
`;

const InfoContent = styled.div`
  grid-area: info;

  display: flex;
  flex-direction: column;
`;

UserInfo.propTypes = {
  profileInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string,
    bio: PropTypes.string,
    imgUrl: PropTypes.string,
    age: PropTypes.number
  }).isRequired
};
