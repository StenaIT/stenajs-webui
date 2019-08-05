import * as React from "react";
import { useMemo } from "react";
import { useTheme } from "./hooks/UseTheme";
import { PartialTheme } from "./Theme";
import { ThemeContext, ThemeContextValue } from "./ThemeContext";
import { mergeTheme } from "./themeMerger";

export interface ThemeProviderProps {
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
