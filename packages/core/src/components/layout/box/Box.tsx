import styled from "@emotion/styled";
import { BackgroundProperty, BoxShadowProperty } from "csstype";
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
  BorderColorProps,
  borderLeft,
  BorderLeftProps,
  BorderProps,
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
  BorderProps &
  BorderColorProps &
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
  row?: boolean;
  spacing?: boolean | number;
  indent?: boolean | number;
  style?: React.CSSProperties;
  shadow?: ShadowType | BoxShadowProperty;
  background?: ThemeColorField | BackgroundProperty<TLengthStyledSystem>;
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
  ${flex};
  flex-direction: ${props =>
    (props.row && "row") || props.flexDirection || "column"};
  ${flexWrap};
  ${height};
  ${justifyContent};
  ${minHeight};
  ${maxHeight};
  ${maxWidth};
  ${overflow};
  padding: ${props => numberOrZero(props.spacing) * props.themeSpacing}px
    ${props => numberOrZero(props.indent) * props.themeIndent}px;
  ${position}
  ${width};
  ${zIndex}
  ${left}
  ${right}
  ${top}
  ${bottom}
`;

export const Box: React.FC<BoxProps> = ({
  innerRef,
  shadow,
  background,
  ...props
}) => {
  const boxProps = useThemeSelector(
    ({ shadows, colors, metrics }) => ({
      boxShadow: (shadow && shadows[shadow]) || shadow,
      background: (background && colors[background]) || background,
      themeSpacing: metrics.spacing,
      themeIndent: metrics.indent
    }),
    [shadow, background]
  );
  return <FlexBox ref={innerRef} {...boxProps} {...props} />;
};

const numberOrZero = (num: number | boolean | undefined): number =>
  (num as number) || 0;
