import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled";
import {
  BackgroundProperty,
  BorderColorProperty,
  BorderProperty,
  BoxShadowProperty,
  ColorProperty,
  CursorProperty,
  OutlineProperty
} from "csstype";
import * as React from "react";
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
  ZIndexProps
} from "styled-system";
import { useThemeSelector } from "../../../theme/hooks/UseThemeSelector";
import { ThemeColorField } from "../../../theme/theme-types/ThemeColors";
import { ThemeShadows } from "../../../theme/theme-types/ThemeShadows";
import { DivProps } from "../../../types/ElementProps";

type StyledSystemProps = BorderRadiusProps &
  BorderStyleProps &
  BorderWidthProps &
  BorderLeftProps &
  BorderRightProps &
  BorderTopProps &
  BorderBottomProps &
  FlexboxProps &
  LayoutProps &
  OverflowProps &
  PositionProps &
  ZIndexProps &
  LeftProps &
  RightProps &
  TopProps &
  BottomProps;

type FlexBoxProps = BoxProps;

type ShadowType = keyof ThemeShadows;

export interface BoxProps extends StyledSystemProps, DivProps {
  element?: "button" | "span" | "div";
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
   * Changes the cursor of the mouse.
   */
  cursor?: CursorProperty;
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
   * Sets the opacity of the box when hovering with mouse.
   */
  hoverOpacity?: number;
  /**
   * Sets the background of the box when active.
   */
  activeBackground?: ThemeColorField | BackgroundProperty<TLengthStyledSystem>;
  /**
   * Sets the border of the box when active.
   */
  activeBorder?: ThemeColorField | BorderProperty<TLengthStyledSystem>;
  /**
   * Sets the opacity of the box when active.
   */
  activeOpacity?: number;
  /**
   * Sets the shadow of the box when active.
   */
  activeBoxShadow?: ShadowType | BoxShadowProperty;
  /**
   * Sets the background of the box when the box is in focus.
   */
  focusBackground?: ThemeColorField | BackgroundProperty<TLengthStyledSystem>;
  /**
   * Sets the border of the box when the box is in focus.
   */
  focusBorder?: ThemeColorField | BorderProperty<TLengthStyledSystem>;
  /**
   * Sets the opacity of the box when the box is in focus.
   */
  focusOpacity?: number;
  /**
   * Sets the outline of the box when the box is in focus.
   */
  focusOutline?: OutlineProperty<TLengthStyledSystem>;
  /**
   * Sets the shadow of the box when active.
   */
  focusBoxShadow?: ShadowType | BoxShadowProperty;
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
  /**
   * Sets the border of the box when focus is within the box.
   */
  focusWithinOpacity?: number;
  /**
   * Sets the shadow of the box when focus is within the box.
   */
  focusWithinBoxShadow?: ShadowType | BoxShadowProperty;
}

const excludedProps = ["spacing", "indent", "width", "height", "color"];

const isExcludedWebUiProp = (propName: string) =>
  excludedProps.indexOf(propName) !== -1;

const getPaddingRule = (props: InnerProps) =>
  `padding: ${numberOrZero(props.spacing) * (props.themeSpacing || 10)}px
    ${numberOrZero(props.indent) * (props.themeIndent || 10)}px;`;

type InnerProps = FlexBoxProps &
  BoxShadowProps &
  BackgroundProps & { themeSpacing: number; themeIndent: number };

const FlexBox = styled("div", {
  shouldForwardProp: propName =>
    isExcludedWebUiProp(propName) ? false : isPropValid(propName)
})<InnerProps>`
  box-sizing: border-box;
  display: ${props => props.display || "flex"};
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
  flex-direction: ${props =>
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
  ${({ cursor }) => (cursor ? `cursor: ${cursor};` : "")}
  :hover {
    ${({ hoverBackground }) =>
      hoverBackground ? `background: ${hoverBackground};` : ""}
    ${({ hoverBorder }) => (hoverBorder ? `border: ${hoverBorder};` : "")}
    ${({ hoverOpacity }) => (hoverOpacity ? `opacity: ${hoverOpacity};` : "")}
  }
  :active {
    ${({ activeBackground }) =>
      activeBackground ? `background: ${activeBackground};` : ""}
    ${({ activeBorder }) => (activeBorder ? `border: ${activeBorder};` : "")}
    ${({ activeOpacity }) =>
      activeOpacity ? `opacity: ${activeOpacity};` : ""}
    ${({ activeBoxShadow }) =>
      activeBoxShadow ? `box-shadow: ${activeBoxShadow};` : ""}
  }
  :focus {
    ${({ focusBackground }) =>
      focusBackground ? `background: ${focusBackground};` : ""}
    ${({ focusBorder }) => (focusBorder ? `border: ${focusBorder};` : "")}
    ${({ focusOpacity }) => (focusOpacity ? `opacity: ${focusOpacity};` : "")}
    ${({ focusOutline }) => (focusOutline ? `outline: ${focusOutline};` : "")}
    ${({ focusBoxShadow }) =>
      focusBoxShadow ? `box-shadow: ${focusBoxShadow};` : ""}
  }
  :focus-within {
    ${({ focusWithinBackground }) =>
      focusWithinBackground ? `background: ${focusWithinBackground};` : ""}
    ${({ focusWithinBorder }) =>
      focusWithinBorder ? `border: ${focusWithinBorder};` : ""}
    ${({ focusWithinOpacity }) =>
      focusWithinOpacity ? `opacity: ${focusWithinOpacity};` : ""}
    ${({ focusWithinBoxShadow }) =>
      focusWithinBoxShadow ? `box-shadow: ${focusWithinBoxShadow};` : ""}
  }
`;

export const Box: React.FC<BoxProps> = ({
  innerRef,
  element,
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

  const FlexBoxComponent = element ? FlexBox.withComponent(element) : FlexBox;

  return <FlexBoxComponent ref={innerRef} {...boxProps} {...props} />;
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
