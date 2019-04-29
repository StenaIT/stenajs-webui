import { DependencyList, useMemo } from "react";
import { Theme } from "../Theme";
import { useTheme } from "./UseTheme";

type ThemeSelectorFunction<T extends {}> = (theme: Theme) => T;

export const useThemeSelector = <T extends {}>(
  fn: ThemeSelectorFunction<T>,
  deps: DependencyList | undefined
) => {
  const theme = useTheme();
  const memoizedSelector = useMemo(() => fn, deps);
  return useMemo(() => memoizedSelector(theme), [theme, memoizedSelector]);
};
