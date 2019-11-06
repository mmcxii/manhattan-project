import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';

import { UserProps, ProductProps } from 'Store';
import { Card, CardHeader, CardBody } from 'Elements';
import HighlightedFavorite from './HighlightedFavorite';
import FavoritesList from './FavoritesList';

interface Props {
  profileInfo: UserProps;
}

const FavoritesSection: React.FC<Props> = ({ profileInfo }) => {
  const [favorites, setFavorites] = useState<ProductProps[]>([]);
  const [highlightedFavorite, setHighlightedFavorite] = useState<ProductProps | null>(null);
  const [newHighlighted, setNewHighlighted] = useState<boolean>(true);

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
    setNewHighlighted(true);
  }, [profileInfo.username]);

  useLayoutEffect(() => {
    const fetchHighlightedFavorite = async () => {
      try {
        const response: Response = await fetch(`/api/users/${profileInfo.username}/favorites/highlighted`, {
          method: 'GET'
        });

        const errorCodes: number[] = [400, 404, 500];
        if (errorCodes.includes(response.status)) {
          return;
        }

        const data = await response.json();
        setHighlightedFavorite(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (newHighlighted) {
      setHighlightedFavorite(null);

      fetchHighlightedFavorite().then(() => {
        setNewHighlighted(false);
      });
    }
  }, [profileInfo, newHighlighted]);

  return (
    <Wrapper>
      <CardHeader as='h3'>{`${profileInfo.name || profileInfo.username}'s cellar`}</CardHeader>
      <CardBody>
        {favorites ? (
          <>
            {highlightedFavorite && (
              <HighlightedFavorite
                product={highlightedFavorite}
                highlightedFavorite={highlightedFavorite}
                setNewHighlighted={setNewHighlighted}
              />
            )}
            <FavoritesList
              favorites={favorites}
              highlightedFavorite={highlightedFavorite}
              setNewHighlighted={setNewHighlighted}
            />
          </>
        ) : (
          <NoFavsMessage>This user does not have any favorites yet</NoFavsMessage>
        )}
      </CardBody>
    </Wrapper>
  );
};

export default FavoritesSection;

const Wrapper = styled(Card).attrs({ as: 'section' })`
  text-transform: capitalize;
`;

const NoFavsMessage = styled.p``;
