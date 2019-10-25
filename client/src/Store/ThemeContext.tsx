import React, { createContext, useState, useContext } from 'react';
import { UserContext } from './UserContext';

type ThemeTypes = 'dark' | 'light';
export const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

export const ThemeContextProvider = (props: any) => {
  const { user } = useContext(UserContext);

  const [theme, setTheme] = useState<ThemeTypes>(user.theme || 'dark');
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{props.children}</ThemeContext.Provider>;
};
