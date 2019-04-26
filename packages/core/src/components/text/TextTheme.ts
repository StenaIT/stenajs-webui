import { FontWeightProperty } from 'csstype';
import { defaultFonts } from '../../../themes/default-values/DefaultFonts';
import { defaultFontSizes } from '../../../themes/default-values/DefaultFontSizes';

export interface TextTheme {
  fontSize: string;
  fontFamily: string;
  fontWeightBold: FontWeightProperty;
  fontWeightNormal?: FontWeightProperty;
  fontWeightLight: FontWeightProperty;
}

export const defaultHeaderTextTheme: TextTheme = {
  fontSize: defaultFontSizes.huge,
  fontFamily: defaultFonts.primary,
  fontWeightBold: 600,
  fontWeightLight: 100,
};

export const defaultSectionHeaderTextTheme: TextTheme = {
  fontSize: defaultFontSizes.large,
  fontFamily: defaultFonts.primary,
  fontWeightBold: 600,
  fontWeightLight: 100,
};

export const defaultLargeTextTheme: TextTheme = {
  fontSize: defaultFontSizes.large,
  fontFamily: defaultFonts.primary,
  fontWeightBold: 600,
  fontWeightLight: 100,
};

export const defaultDefaultTextTheme: TextTheme = {
  fontSize: defaultFontSizes.normal,
  fontFamily: defaultFonts.primary,
  fontWeightBold: 600,
  fontWeightLight: 100,
};

export const defaultSmallTextTheme: TextTheme = {
  fontSize: defaultFontSizes.small,
  fontFamily: defaultFonts.primary,
  fontWeightBold: 600,
  fontWeightLight: 100,
};

export const defaultSmallerTextTheme: TextTheme = {
  fontSize: defaultFontSizes.smaller,
  fontFamily: defaultFonts.primary,
  fontWeightBold: 600,
  fontWeightLight: 100,
};

export const defaultTinyTextTheme: TextTheme = {
  fontSize: defaultFontSizes.tiny,
  fontFamily: defaultFonts.primary,
  fontWeightBold: 600,
  fontWeightLight: 100,
};
