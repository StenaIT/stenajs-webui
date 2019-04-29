import { Theme } from '../Theme';
import { useTheme } from './UseTheme';

type ThemeSelectorFunction<T extends {}> = (theme: Theme) => T;

export const useThemeSelector = <T extends {}>(fn: ThemeSelectorFunction<T>) => {
  const theme = useTheme();
  return fn(theme);
};

