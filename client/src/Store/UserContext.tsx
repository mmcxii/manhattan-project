import React, { createContext, useReducer } from 'react';

import { ProductProps } from './IProduct';
import { CommentProps } from './IComment';

export interface UserProps {
  id: string;
  username: string;
  theme: 'dark' | 'light';
  name?: string;
  age?: number;
  bio?: string;
  comments?: CommentProps[];
  highlightedFavorite?: string;
  favorites: string[];
  follows: UserProps[];
  followers: UserProps[];
  imgUrl?: string;
}

interface ActionProps {
  type: 'LOG_USER_IN' | 'LOG_USER_OUT' | 'ADD_FOLLOW' | 'REMOVE_FOLLOW' | 'ADD_FAVORITE' | 'REMOVE_FAVORITE';
  payload: UserProps;
}

const initialState: UserProps = { id: '', username: '', theme: 'dark', favorites: [], follows: [], followers: [] };

export const UserContext = createContext<UserProps | any>(initialState);

const reducer = (state: UserProps, action: ActionProps | ProductProps): UserProps => {
  switch (action.type) {
    case 'LOG_USER_IN':
      return { ...action.payload };

    case 'LOG_USER_OUT':
      return { ...initialState };

    case 'ADD_FOLLOW':
      return { ...state, follows: [...state.follows, action.payload] };

    case 'REMOVE_FOLLOW':
      return { ...state, follows: state.follows.filter(item => item.id !== action.payload.id) };

    case 'ADD_FAVORITE':
      //@ts-ignore
      return { ...state, favorites: [...state.favorites, action.payload] };

    case 'REMOVE_FAVORITE':
      //@ts-ignore
      return { ...state, favorites: state.favorites.filter(item => item._id !== action.payload._id) };

    default:
      return state;
  }
};

export const UserContextProvider = (props: any) => {
  const [user, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider value={{ user, dispatch }}>{props.children}</UserContext.Provider>;
};
