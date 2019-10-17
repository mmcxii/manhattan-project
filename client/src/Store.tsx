import React, { createContext, useState } from 'react';

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

type ThemeTypes = 'dark' | 'light';
export const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

export const ThemeContextProvider = (props: any) => {
  const [theme, setTheme] = useState<ThemeTypes>('dark');
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{props.children}</ThemeContext.Provider>;
};
