import styled from "@emotion/styled";
import {
  BackgroundProperty,
  BorderColorProperty,
  BorderProperty,
  BoxShadowProperty,
  ColorProperty
} from "csstype";
import * as React from "react";
import {
  alignItems,
  AlignItemsProps,
  background,
  BackgroundProps,
  border,
  borderBottom,
  BorderBottomProps,
  borderColor,
  borderLeft,
  BorderLeftProps,
  borderRadius,
  BorderRadiusProps,
  borderRight,
  BorderRightProps,
  borderStyle,
  BorderStyleProps,
  borderTop,
  BorderTopProps,
  borderWidth,
  BorderWidthProps,
  bottom,
  BottomProps,
  boxShadow,
  BoxShadowProps,
  DisplayProps,
  flex,
  FlexDirectionProps,
  FlexProps,
  flexWrap,
  FlexWrapProps,
  height,
  HeightProps,
  justifyContent,
  JustifyContentProps,
  left,
  LeftProps,
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  minHeight,
  MinHeightProps,
  minWidth,
  MinWidthProps,
  overflow,
  OverflowProps,
  position,
  PositionProps,
  right,
  RightProps,
  TLengthStyledSystem,
  top,
  TopProps,
  width,
  WidthProps,
  zIndex,
  ZIndexProps
} from "styled-system";
import { useThemeSelector } from "../../../theme/hooks/UseThemeSelector";
import { ThemeColorField } from "../../../theme/theme-types/ThemeColors";
import { ThemeShadows } from "../../../theme/theme-types/ThemeShadows";

type StyledSystemProps = AlignItemsProps &
  DisplayProps &
  BorderRadiusProps &
  BorderStyleProps &
  BorderWidthProps &
  BorderLeftProps &
  BorderRightProps &
  BorderTopProps &
  BorderBottomProps &
  FlexDirectionProps &
  FlexProps &
  FlexWrapProps &
  HeightProps &
  JustifyContentProps &
  MinHeightProps &
  MaxHeightProps &
  MinWidthProps &
  MaxWidthProps &
  OverflowProps &
  PositionProps &
  WidthProps &
  ZIndexProps &
  LeftProps &
  RightProps &
  TopProps &
  BottomProps;

type FlexBoxProps = BoxProps;

type ShadowType = keyof ThemeShadows;

type DivProps = JSX.IntrinsicElements["div"];

export interface BoxProps extends StyledSystemProps, DivProps {
  innerRef?: React.Ref<HTMLDivElement>;
  /**
   * Sets the text color of the box.
   */
  color?: ThemeColorField | ColorProperty;
  /**
   * If true, children are placed in a row.
   */
  row?: boolean;
  /**
   * Adds spacing over and under content.
   */
  spacing?: boolean | number;
  /**
   * Adds spacing left and right of content.
   */
  indent?: boolean | number;
  style?: React.CSSProperties;
  /**
   * Adds a shadow around the box.
   */
  shadow?: ShadowType | BoxShadowProperty;
  /**
   * Sets the background of the box.
   */
  background?: ThemeColorField | BackgroundProperty<TLengthStyledSystem>;
  /**
   * Sets the border of the box.
   */
  border?: ThemeColorField | BorderProperty<TLengthStyledSystem>;
  /**
   * Sets the border color of the box.
   */
  borderColor?: ThemeColorField | BorderColorProperty;
  /**
   * Sets the background of the box when hovering with mouse.
   */
  hoverBackground?: ThemeColorField | BackgroundProperty<TLengthStyledSystem>;
  /**
   * Sets the border of the box when hovering with mouse.
   */
  hoverBorder?: ThemeColorField | BorderProperty<TLengthStyledSystem>;
}

const FlexBox = styled.div<
  FlexBoxProps &
    BoxShadowProps &
    BackgroundProps & { themeSpacing: number; themeIndent: number }
>`
  display: ${props => props.display || "flex"};
  ${alignItems};
  ${background};
  ${border};
  ${borderRight};
  ${borderLeft};
  ${borderTop};
  ${borderBottom};
  ${borderColor};
  ${borderRadius};
  ${borderStyle};
  ${borderWidth};
  ${boxShadow};
  ${({ color }) => (color ? `color: ${color};` : "")}
  ${flex};
  flex-direction: ${props =>
    (props.row && "row") || props.flexDirection || "column"};
  ${flexWrap};
  ${height};
  ${justifyContent};
  ${minHeight};
  ${minWidth};
  ${maxHeight};
  ${maxWidth};
  ${overflow};
  padding: ${props =>
    numberOrZero(props.spacing) * (props.themeSpacing || 10)}px
    ${props => numberOrZero(props.indent) * (props.themeIndent || 10)}px;
  ${position}
  ${width};
  ${zIndex}
  ${left}
  ${right}
  ${top}
  ${bottom}
  :hover {
    background: ${({ hoverBackground }) => hoverBackground};
    border: ${({ hoverBorder }) => hoverBorder};
  }
`;

export const Box: React.FC<BoxProps> = ({
  innerRef,
  shadow,
  background,
  border,
  borderColor,
  color,
  ...props
}) => {
  const boxProps = useThemeSelector(
    ({ shadows, colors, metrics }) => ({
      boxShadow: (shadow && shadows[shadow]) || shadow,
      background: (background && colors[background]) || background,
      themeSpacing: metrics.spacing,
      themeIndent: metrics.indent,
      color: (color && colors[color]) || color,
      border: (border && colors[border]) || border,
      borderColor: (borderColor && colors[borderColor]) || borderColor
    }),
    [shadow, background, border, borderColor, color]
  );
  return <FlexBox ref={innerRef} {...boxProps} {...props} />;
};

const numberOrZero = (num: number | boolean | undefined): number => {
  if (num == null) {
    return 0;
  }
  if (typeof num === "boolean") {
    return num ? 1 : 0;
  }
  return num;
};
