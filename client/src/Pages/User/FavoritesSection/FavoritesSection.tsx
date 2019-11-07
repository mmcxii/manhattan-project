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
    let isSubscribed = true;

    const fetchFavorites = async () => {
      try {
        const response: Response = await fetch(`/api/users/${profileInfo.username}/favorites`, {
          method: 'GET'
        });

        if (!response.ok) {
          return;
        }

        const data: ProductProps[] = await response.json();

        isSubscribed && setFavorites(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFavorites();
    isSubscribed && setNewHighlighted(true);

    return () => {
      isSubscribed = false;
    }
  }, [profileInfo.username]);

  useLayoutEffect(() => {
    let isSubscribed = true;

    const fetchHighlightedFavorite = async () => {
      try {
        const response: Response = await fetch(`/api/users/${profileInfo.username}/favorites/highlighted`, {
          method: 'GET'
        });

        // If error OR no content (no favorite) -> return
        if (!response.ok || response.status === 204) {
          return;
        }

        const data = await response.json();
        isSubscribed && setHighlightedFavorite(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (newHighlighted) {
      isSubscribed && setHighlightedFavorite(null);

      fetchHighlightedFavorite().then(() => {
        isSubscribed && setNewHighlighted(false);
      });
    }

    return () => {
      isSubscribed = false;
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
