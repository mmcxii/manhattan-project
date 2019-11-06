import React, { useContext, useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ProductProps, UserContext } from 'Store';
import { spacing, red } from 'Utilities';
import { ButtonTrans } from './Button';

interface Props {
  item: ProductProps;
}

export const FavoriteButton: React.FC<Props> = ({ item }) => {
  const { user, dispatch } = useContext(UserContext);
  const { push } = useHistory();
  const [icon, setIcon] = useState<string>('fal fa-star');
  const [isFavorited, setIsFavorited] = useState(user.favorites.includes(item._id));

  useLayoutEffect(() => {
    setIcon(isFavorited ? 'fas fa-star' : 'fal fa-star');
  }, [isFavorited]);

  const lsLoginToken = localStorage.getItem('loginToken');
  let loginToken: string;
  if (lsLoginToken) {
    loginToken = lsLoginToken;
  } else {
    push('/login');
  }

  const toggleFavorite = async () => {
    const mode: 'DELETE' | 'PUT' = isFavorited ? 'DELETE' : 'PUT';
    const queryUrl: string = `/api/users/${user.username}/favorites`;

    try {
      await fetch(queryUrl, {
        method: mode,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`
        },
        body: JSON.stringify({
          product: item._id
        })
      });

      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          ...user,
          favorites: isFavorited
            ? // If toggleFavorite is being ran on an item that is currently a favorite, delete it
              user.favorites.filter((fav: string) => fav !== item._id)
            : // If toggleFavorite is being ran on an item that is not a favorite, save it
              [...user.favorites, item._id]
        })
      );
      dispatch({ type: isFavorited ? 'DELETE_FAVORITE' : 'ADD_FAVORITE', payload: item._id });

      setIsFavorited(!isFavorited);
    } catch (error) {}
  };

  return (
    <Button onClick={toggleFavorite}>
      <Icon className={icon} />
    </Button>
  );
};

const Button = styled(ButtonTrans)`
  grid-area: favBtn;

  justify-self: flex-end;
  padding: ${spacing.sm};
`;

const Icon = styled.i`
  color: ${red};
`;
