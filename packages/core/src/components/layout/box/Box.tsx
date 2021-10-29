import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled";
import { Property } from "csstype";

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
  ResponsiveValue,
  right,
  RightProps,
  system,
  TLengthStyledSystem,
  top,
  TopProps,
  zIndex,
  ZIndexProps,
} from "styled-system";
import { DivProps } from "../../../types/ElementProps";
import { booleanOrNumberToNumber } from "../../../utils/BooleanOrNumberToNumber";

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

const shadows = {
  box: "var(--swui-shadow-box)",
  popover: "var(--swui-shadow-popover)",
  modal: "var(--swui-shadow-modal)",
  elevationXS: "var(--swui-shadow-elevation-xs)",
  elevationS: "var(--swui-shadow-elevation-s)",
  elevationM: "var(--swui-shadow-elevation-m)",
  elevationL: "var(--swui-shadow-elevation-l)",
  elevationXL: "var(--swui-shadow-elevation-xl)",
  elevationXXL: "var(--swui-shadow-elevation-xxl)",
};

type ShadowType = keyof typeof shadows;

export interface BoxProps extends StyledSystemProps, DivProps {
  /**
   * If true, children are placed in a row.
   */
  row?: ResponsiveValue<boolean>;

  /**
   * Adds spacing over and under content.
   */
  spacing?: ResponsiveValue<boolean | TLengthStyledSystem>;

  /**
   * Adds spacing left and right of content.
   */
  indent?: ResponsiveValue<boolean | TLengthStyledSystem>;

  /**
   * Adds a shadow around the box.
   */
  shadow?: ResponsiveValue<Property.BoxShadow | ShadowType>;

  /**
   * Sets the background of the box.
   */
  background?: ResponsiveValue<Property.Background<TLengthStyledSystem>>;

  /**
   * Sets the border of the box.
   */
  border?: ResponsiveValue<Property.Border<TLengthStyledSystem>>;

  /**
   * Sets the border color of the box.
   */
  borderColor?: ResponsiveValue<Property.BorderColor>;

  /**
   * Sets the background of the box when hovering with mouse.
   */
  hoverBackground?: Property.Background<TLengthStyledSystem>;

  /**
   * Sets the border of the box when hovering with mouse.
   */
  hoverBorder?: Property.Border<TLengthStyledSystem>;

  /**
   * Sets the background of the box when the box is in focus.
   */
  focusBackground?: Property.Background<TLengthStyledSystem>;

  /**
   * Sets the border of the box when the box is in focus.
   */
  focusBorder?: Property.Border<TLengthStyledSystem>;

  /**
   * Sets the background of the box when focus is within the box.
   */
  focusWithinBackground?: Property.Background<TLengthStyledSystem>;

  /**
   * Sets the border of the box when focus is within the box.
   */
  focusWithinBorder?: Property.Border<TLengthStyledSystem>;
}

const excludedProps = [
  "spacing",
  "indent",
  "width",
  "height",
  "overflow",
  "display",
  "shadow",
  "elevation",
];

const isExcludedWebUiProp = (propName: string) =>
  excludedProps.includes(propName);

const box = system({
  row: {
    property: "flexDirection",
    transform: (row: boolean) => (row ? "row" : "column"),
  },
  indent: {
    // @ts-ignore
    property: "--current-indent",
    transform: booleanOrNumberToNumber,
  },
  spacing: {
    // @ts-ignore
    property: "--current-spacing",
    transform: booleanOrNumberToNumber,
  },
  shadow: {
    property: "boxShadow",
    transform: (value) => shadows[value] ?? value,
  },
});

type InnerProps = BoxProps & BoxShadowProps & BackgroundProps;

export const Box = styled("div", {
  shouldForwardProp: (propName) =>
    typeof propName === "string"
      ? isExcludedWebUiProp(propName)
        ? false
        : isPropValid(propName)
      : false,
})<InnerProps>`
  --current-spacing: 0;
  --current-indent: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  ${box};
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
  ${flexbox};
  ${overflow};
  ${position};
  ${layout};
  ${zIndex};
  ${left};
  ${right};
  ${top};
  ${bottom};

  padding: calc(var(--current-spacing) * var(--swui-metrics-spacing))
    calc(var(--current-indent) * var(--swui-metrics-indent));
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
