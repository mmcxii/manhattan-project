import React, { createContext, useState } from 'react';

export interface UserProps {
  username: string;
  theme?: 'dark' | 'light';
  name?: string;
  age?: number;
  bio?: string;
  highlightedFavorite?: string;
  favorites?: string[];
  follows?: UserProps[];
  following?: UserProps[];
}

const intitialState: UserProps = {
  username: '',
};

export const UserContext = createContext<UserProps | any>(intitialState);

export const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<UserProps>(intitialState);

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};
