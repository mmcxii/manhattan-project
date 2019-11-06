import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { UserContext, ProductProps } from 'Store';
import { green, black } from 'Utilities';
import { ButtonTrans } from 'Elements';

interface Props {
  productId: string;
  highlightedFavorite: ProductProps | null;
  setNewHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
}

const MarkFavButton: React.FC<Props> = ({ productId, highlightedFavorite, setNewHighlighted }) => {
  const { user } = useContext(UserContext);
  const { username } = useParams();
  const [isMarked, setIsMarked] = useState<boolean>(false);
  const lsLoginToken: string | null = localStorage.getItem('loginToken');
  let loginToken: string;
  if (lsLoginToken) {
    loginToken = lsLoginToken;
  }

  useEffect(() => {
    if (highlightedFavorite) {
      if (highlightedFavorite._id === productId) {
        setIsMarked(true);
      } else {
        setIsMarked(false);
      }
    }
  }, [user, highlightedFavorite]);

  const toggleFavorite = async () => {
    const mode: 'DELETE' | 'PUT' = isMarked ? 'DELETE' : 'PUT';

    try {
      const response: Response = await fetch(`/api/users/${username}/favorites/highlighted`, {
        method: mode,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`
        },
        body: JSON.stringify({ product: productId })
      });
      const data = await response.json();

      setIsMarked(!isMarked);
      setNewHighlighted(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (username !== user.username) {
    return null;
  }
  return (
    <ButtonTrans onClick={() => toggleFavorite()}>
      <Icon className='fas fa-crown' isMarked={isMarked} />
    </ButtonTrans>
  );
};

export default MarkFavButton;

const Icon = styled.i<{ isMarked: boolean }>`
  color: ${props => (props.isMarked ? green : black)};
`;
