import React from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { spacing } from 'Utilities';
import { Card, CardHeader, CardBody } from 'Elements';

interface Props {
  profileInfo: UserProps;
}

const FavoritesSection: React.FC<Props> = ({ profileInfo }) => (
  <Wrapper>
    <CardHeader as='h3'>{`${profileInfo.name || profileInfo.username}'s cellar`}</CardHeader>
    <CardBody>
      {profileInfo.favorites.length > 0 && (
        <HighlightedFavorite>{profileInfo.highlightedFavorite || profileInfo.favorites[0]}</HighlightedFavorite>
      )}

      <Favorites>
        {profileInfo.favorites.length > 0 ? (
          profileInfo.favorites.map(fav => <FavoritesItem key={fav._id}>{fav}</FavoritesItem>)
        ) : (
          <NoFavsMessage>This user does not have any favorites yet</NoFavsMessage>
        )}
      </Favorites>
    </CardBody>
  </Wrapper>
);

export default FavoritesSection;

const Wrapper = styled(Card).attrs({ as: 'section' })`
  text-transform: capitalize;
`;

const HighlightedFavorite = styled.p`
  margin: -${spacing.md};
  margin-bottom: 0;
  padding: ${spacing.sm} ${spacing.md};
  background: rgba(0, 0, 0, 0.25);
`;

const Favorites = styled.ul``;

const FavoritesItem = styled.li``;

const NoFavsMessage = styled.p``;
