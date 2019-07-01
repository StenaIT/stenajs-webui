import * as React from 'react';
import { defaultTheme } from './DefaultTheme';
import { Theme } from './Theme';

export type ThemeContextValue = Theme;

export const ThemeContext = React.createContext<ThemeContextValue>(
  defaultTheme,
);

export const ThemeProvider = ThemeContext.Provider;
