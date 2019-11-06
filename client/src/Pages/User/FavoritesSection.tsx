import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { UserProps, ProductProps } from 'Store';
import { spacing } from 'Utilities';
import { Card, CardHeader, CardBody } from 'Elements';

interface Props {
  profileInfo: UserProps;
}

const FavoritesSection: React.FC<Props> = ({ profileInfo }) => {
  const [favorites, setFavorites] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response: Response = await fetch(`/api/users/${profileInfo.username}/favorites`, {
          method: 'GET'
        });

        const data = await response.json();

        setFavorites(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Wrapper>
      <CardHeader as='h3'>{`${profileInfo.name || profileInfo.username}'s cellar`}</CardHeader>
      <CardBody>
        {favorites.length > 0 && (
          <HighlightedFavorite>{profileInfo.highlightedFavorite || favorites[0].name}</HighlightedFavorite>
        )}

        <Favorites>
          {favorites.length > 0 ? (
            favorites.map(fav => <FavoritesItem key={fav._id}>{fav.name}</FavoritesItem>)
          ) : (
            <NoFavsMessage>This user does not have any favorites yet</NoFavsMessage>
          )}
        </Favorites>
      </CardBody>
    </Wrapper>
  );
};

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
