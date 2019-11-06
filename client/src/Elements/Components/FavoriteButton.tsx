import React from 'react';

import { UserProps, ProductProps } from 'Store';
import { ButtonTrans } from './Button';

interface Props {
  user: UserProps;
  item: ProductProps;
}

const FavoriteButton: React.FC<Props> = ({ user, item }) => {
  return <ButtonTrans></ButtonTrans>;
};

export default FavoriteButton;
