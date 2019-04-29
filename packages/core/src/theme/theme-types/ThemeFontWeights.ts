import { FontWeightProperty } from 'csstype';

export interface ThemeFontWeights {
  bold: FontWeightProperty;
  standard: FontWeightProperty;
  light: FontWeightProperty;
}

export type ThemeFontWeightField = keyof ThemeFontWeights; // TODO CSS type?
