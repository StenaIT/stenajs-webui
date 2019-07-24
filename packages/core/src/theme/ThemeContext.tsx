import * as React from "react";
import { useMemo } from "react";
import { defaultTheme } from "./DefaultTheme";
import { useTheme } from "./hooks/UseTheme";
import { PartialTheme, Theme } from "./Theme";
import { mergeTheme } from "./themeMerger";

export type ThemeContextValue = Theme;

export const ThemeContext = React.createContext<ThemeContextValue>(
  defaultTheme
);

interface ThemeProviderProps {
  value: PartialTheme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  value,
  children
}) => {
  const parentTheme = useTheme();
  const mergedValue: ThemeContextValue = useMemo<ThemeContextValue>(
    () => mergeTheme(parentTheme, value),
    [parentTheme, value]
  );
  return (
    <ThemeContext.Provider value={mergedValue}>
      {children}
    </ThemeContext.Provider>
  );
};
