import React, { createContext, useState, useReducer } from 'react';

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

interface ActionProps {
  type: 'LOG_USER_IN' | 'LOG_USER_OUT';
  payload: UserProps;
}

const initialState: UserProps = { username: '' };

export const UserContext = createContext<UserProps | any>(initialState);

const reducer = (state: UserProps, action: ActionProps): UserProps => {
  switch (action.type) {
    case 'LOG_USER_IN':
      return { ...action.payload };
    case 'LOG_USER_OUT':
      return { ...initialState };
  }
};

export const UserContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider value={{ state, dispatch }}>{props.children}</UserContext.Provider>;
};
