import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Appearance } from 'react-native-appearance';

interface ThemeContextData {
  theme: 'dark' | 'light';
  handleThemeToggling: () => void;
  colors: {
    green: string;
    green_dark: string;
    green_light: string;
    heading: string;
    body_dark: string;
    body_light: string;
    background: string;
    shape: string;
    white: string;
    gray: string;
    blue: string;
    blue_light: string;
    red: string;
    black: string;
  };
}

export const ThemeContext = createContext({} as ThemeContextData);

type ThemeContextProviderProps = {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps ) {
  const [theme, setTheme] = useState(() => {
    const theme = Appearance.getColorScheme();
    if(theme !== 'no-preference')
      return theme;
    
    return 'light';
  });

  const [colors, setColors] = useState({
      green: '#32B768',
      green_dark: '#2B7A4B',
      green_light: '#DAF2E4',
    
      heading: '#52665A',
      body_dark: '#738078',
      body_light: '#AAB2AD',
    
      background: '#fff',
      shape: '#F0F0F0',
      white: '#FFFFFF',
      gray: '#f7f7f7',
    
      blue: '#3D7199',
      blue_light: '#EBF6FF',
    
      red: '#E83F5B',
      
      black: '#4a4a4a',
  })

  const handleThemeToggling = () => {
    if(theme === 'light'){
      setTheme('dark');
      setColors({
        ...colors,
        green_dark: '#32B768',
        heading: '#afdbc1',
        background: '#222831',
        shape: '#435055',
        white: '#222831',
        gray: '#525252',
        black: '#eee',
        body_dark: '#b5c9bd',
      })
    } else {
      setTheme('light');
      setColors({
        ...colors,
        green_dark: '#2B7A4B',
        heading: '#52665A',
        background: '#ffff',
        shape: '#F0F0F0',
        white: '#FFFFFF',
        gray: '#f7f7f7',
        black: '#4a4a4a',
        body_dark: '#738078',
      })
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        handleThemeToggling,
        colors
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext);
}