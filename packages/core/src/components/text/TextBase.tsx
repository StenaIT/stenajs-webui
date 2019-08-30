import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled";
import {
  FontWeightProperty,
  TextDecorationProperty,
  UserSelectProperty,
  WhiteSpaceProperty
} from "csstype";
import * as React from "react";
import {
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  lineHeight,
  LineHeightProps,
  textAlign,
  TextAlignProps
} from "styled-system";
import { useThemeFields } from "../../theme/hooks/UseThemeSelector";
import { ThemeFontField } from "../../theme/theme-types/ThemeFonts";
import { ThemeFontSizeField } from "../../theme/theme-types/ThemeFontSizes";
import { ThemeFontWeightField } from "../../theme/theme-types/ThemeFontWeights";
import { SpanProps } from "../../types/ElementProps";
import { Omit } from "../../types/Omit";
import { useTextTheme } from "./hooks/UseTextTheme";

export interface TextProps
  extends TextThemeProps,
    TextBasePropsBase,
    LineHeightProps,
    Omit<SpanProps, "color"> {}

export interface TextThemeProps {
  fontSize?: ThemeFontSizeField | string;
  fontFamily?: ThemeFontField | string;
  fontWeight?: ThemeFontWeightField | FontWeightProperty;
}

export type TextBaseProps = TextBasePropsBase &
  SpanProps &
  TextBaseInternalProps &
  StyledSystemProps;

export interface TextBasePropsBase {
  /** The color of the text. */
  color?: string;
  /** Changes text color when mouse hovers over text. */
  hoverColor?: string;
  whiteSpace?: WhiteSpaceProperty;
  /** Adds underline to text. */
  textDecoration?: TextDecorationProperty;
  /** Adds underline when mouse hovers over text. */
  hoverUnderline?: boolean;
  /** Makes text italic. */
  italic?: boolean;
  /** Disables the ability to select the text. */
  userSelect?: UserSelectProperty;
}

interface TextBaseInternalProps {
  /** Font weight to use. */
  fontWeight?: FontWeightProperty;
}

type StyledSystemProps = FontWeightProps &
  FontFamilyProps &
  FontSizeProps &
  LineHeightProps &
  TextAlignProps;

const excludedProps = [
  "fontSize",
  "fontWeight",
  "fontFamily",
  "color",
  "textAlign"
];

const isExcludedWebuiProp = (propName: string) =>
  excludedProps.indexOf(propName) !== -1;

const StyledText = styled("span", {
  shouldForwardProp: propName =>
    isExcludedWebuiProp(propName) ? false : isPropValid(propName)
})<TextBaseProps>`
  ${({ color }) => (color ? `color: ${color};` : "")};
  ${fontSize};
  ${fontFamily};
  ${fontWeight};
  ${lineHeight};
  ${textAlign};
  user-select: ${({ userSelect }) => userSelect};
  text-decoration: ${({ textDecoration }) => textDecoration};
  white-space: ${({ whiteSpace }) => whiteSpace};
  font-style: ${({ italic }) => (italic ? "italic" : "")};
  :hover {
    ${({ hoverUnderline }) =>
      hoverUnderline ? "text-decoration: underline;" : ""};
    ${({ hoverColor }) => (hoverColor ? `color: ${hoverColor};` : "")}
  }
`;

export const TextBase: React.FC<TextProps & { element?: "h1" }> = ({
  fontSize = "normal",
  fontFamily = "primary",
  fontWeight = "standard",
  color,
  hoverColor,
  element,
  ...textProps
}) => {
  const themeTextProps = useTextTheme({ fontSize, fontWeight, fontFamily });
  const { colors } = useThemeFields(
    {
      colors: {
        color,
        hoverColor
      }
    },
    [color, hoverColor]
  );

  const StyledTextWithElement = element
    ? StyledText.withComponent(element)
    : StyledText;

  return (
    <StyledTextWithElement {...themeTextProps} {...textProps} {...colors} />
  );
};
