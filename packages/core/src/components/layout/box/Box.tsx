import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled";
import {
  BackgroundProperty,
  BorderColorProperty,
  BorderProperty,
  BoxShadowProperty,
  ColorProperty,
} from "csstype";
import * as React from "react";
import { forwardRef } from "react";
import {
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
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  left,
  LeftProps,
  overflow,
  OverflowProps,
  position,
  PositionProps,
  right,
  RightProps,
  TLengthStyledSystem,
  top,
  TopProps,
  zIndex,
  ZIndexProps,
} from "styled-system";
import { useThemeSelector } from "../../../theme/hooks/UseThemeSelector";
import { ThemeColorField } from "../../../theme/theme-types/ThemeColors";
import { ThemeShadows } from "../../../theme/theme-types/ThemeShadows";
import { DivProps } from "../../../types/ElementProps";

interface StyledSystemProps
  extends BorderRadiusProps,
    BorderStyleProps,
    BorderWidthProps,
    BorderLeftProps,
    BorderRightProps,
    BorderTopProps,
    BorderBottomProps,
    FlexboxProps,
    LayoutProps,
    OverflowProps,
    PositionProps,
    ZIndexProps,
    LeftProps,
    RightProps,
    TopProps,
    BottomProps {}

type ShadowType = keyof ThemeShadows;

export interface BoxProps extends StyledSystemProps, DivProps {
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

  /**
   * Sets the background of the box when the box is in focus.
   */
  focusBackground?: ThemeColorField | BackgroundProperty<TLengthStyledSystem>;

  /**
   * Sets the border of the box when the box is in focus.
   */
  focusBorder?: ThemeColorField | BorderProperty<TLengthStyledSystem>;

  /**
   * Sets the background of the box when focus is within the box.
   */
  focusWithinBackground?:
    | ThemeColorField
    | BackgroundProperty<TLengthStyledSystem>;

  /**
   * Sets the border of the box when focus is within the box.
   */
  focusWithinBorder?: ThemeColorField | BorderProperty<TLengthStyledSystem>;
}

const excludedProps = [
  "spacing",
  "indent",
  "width",
  "height",
  "color",
  "overflow",
];

const isExcludedWebUiProp = (propName: string) =>
  excludedProps.indexOf(propName) !== -1;

const getPaddingRule = (props: InnerProps) =>
  props.spacing || props.indent
    ? `padding: ${numberOrZero(props.spacing) * (props.themeSpacing || 10)}px
    ${numberOrZero(props.indent) * (props.themeIndent || 10)}px;`
    : "";

type InnerProps = BoxProps &
  BoxShadowProps &
  BackgroundProps & { themeSpacing: number; themeIndent: number };

const FlexBox = styled("div", {
  shouldForwardProp: (propName) =>
    isExcludedWebUiProp(propName) ? false : isPropValid(propName),
})<InnerProps>`
  box-sizing: border-box;
  display: ${(props) => props.display || "flex"};
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
  ${flexbox};
  flex-direction: ${(props) =>
    (props.row && "row") || props.flexDirection || "column"};
  ${overflow};
  ${getPaddingRule}
  ${position};
  ${layout};
  ${zIndex};
  ${left};
  ${right};
  ${top};
  ${bottom};
  :hover {
    ${({ hoverBackground }) =>
      hoverBackground ? `background: ${hoverBackground};` : ""}
    ${({ hoverBorder }) => (hoverBorder ? `border: ${hoverBorder};` : "")}
  }
  :focus {
    ${({ focusBackground }) =>
      focusBackground ? `background: ${focusBackground};` : ""}
    ${({ focusBorder }) => (focusBorder ? `border: ${focusBorder};` : "")}
  }
  :focus-within {
    ${({ focusWithinBackground }) =>
      focusWithinBackground ? `background: ${focusWithinBackground};` : ""}
    ${({ focusWithinBorder }) =>
      focusWithinBorder ? `border: ${focusWithinBorder};` : ""}
  }
`;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ shadow, background, border, borderColor, color, ...props }, ref) => {
    const boxProps = useThemeSelector(
      ({ shadows, colors, metrics }) => ({
        boxShadow: (shadow && shadows[shadow]) ?? shadow,
        background: (background && colors[background]) || background,
        themeSpacing: metrics.spacing,
        themeIndent: metrics.indent,
        color: (color && colors[color]) || color,
        border: (border && colors[border]) || border,
        borderColor: (borderColor && colors[borderColor]) || borderColor,
      }),
      [shadow, background, border, borderColor, color]
    );
    return <FlexBox ref={ref} {...boxProps} {...props} />;
  }
);

const numberOrZero = (num: number | boolean | undefined): number => {
  if (num == null) {
    return 0;
  }
  if (typeof num === "boolean") {
    return num ? 1 : 0;
  }
  return num;
};
