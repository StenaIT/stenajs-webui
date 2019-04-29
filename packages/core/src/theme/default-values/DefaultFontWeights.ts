import { ThemeFontWeights } from '../theme-types/ThemeFontWeights';

export const defaultFontWeights: ThemeFontWeights = {
  bold: 600,
  standard: 300,
  light: 100,
};

export type FontWeightField = keyof ThemeFontWeights | string | number;
