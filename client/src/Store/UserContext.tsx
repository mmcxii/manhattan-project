import React, { createContext, useReducer } from 'react';

import { ProductProps } from './IProduct';

export interface UserProps {
  id: string;
  username: string;
  theme: 'dark' | 'light';
  name?: string;
  age?: number;
  bio?: string;
  highlightedFavorite?: ProductProps;
  favorites?: string[];
  follows: UserProps[];
  followers: UserProps[];
  imgUrl?: string;
}

interface ActionProps {
  type: 'LOG_USER_IN' | 'LOG_USER_OUT' | 'ADD_FOLLOW';
  payload: UserProps;
}

const initialState: UserProps = { id: '', username: '', theme: 'dark', follows: [], followers: [] };

export const UserContext = createContext<UserProps | any>(initialState);

const reducer = (state: UserProps, action: ActionProps): UserProps => {
  switch (action.type) {
    case 'LOG_USER_IN':
      return { ...action.payload };
    case 'LOG_USER_OUT':
      return { ...initialState };
    case 'ADD_FOLLOW':
      return { ...state, follows: [...state.follows, action.payload] };
  }
};

export const UserContextProvider = (props: any) => {
  const [user, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider value={{ user, dispatch }}>{props.children}</UserContext.Provider>;
};
