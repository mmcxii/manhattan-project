import {} from 'react';

export interface UserProps {
  username: string;
  name?: string;
  age?: number;
  bio?: string;
  highlightedFavorite?: string;
  favorites?: string[];
  follows?: UserProps[];
  following?: UserProps[];
}
