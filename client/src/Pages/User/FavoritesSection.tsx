import React from 'react';
import styled from 'styled-components';

import { spacing } from 'Utilities';

interface Props {
  highlightedFavorite: string | undefined;
  favorites: string[] | undefined;
}

const FavoritesSection: React.FC<Props> = ({ highlightedFavorite, favorites }) => (
  <Wrapper>
    {favorites && <HighlightedFavorite>{highlightedFavorite || favorites[0]}</HighlightedFavorite>}

    <Favorites>
      {favorites ? (
        favorites.map(fav => <FavoritesItem key={fav}>{fav}</FavoritesItem>)
      ) : (
        <NoFavsMessage>This user does not have any favorites yet</NoFavsMessage>
      )}
    </Favorites>
  </Wrapper>
);

export default FavoritesSection;

const Wrapper = styled.section`
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
