import styled from "@emotion/styled";
import { BackgroundProperty, BoxShadowProperty } from "csstype";
import * as React from "react";
import { PropsWithChildren } from "react";
import {
  alignItems,
  AlignItemsProps,
  background,
  BackgroundProps,
  border,
  BorderProps,
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
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  minHeight,
  MinHeightProps,
  MinWidthProps,
  TLengthStyledSystem,
  width,
  WidthProps
} from "styled-system";
import { useThemeSelector } from "../../theme/hooks/UseThemeSelector";
import { ThemeColorField } from "../../theme/theme-types/ThemeColors";
import { ThemeShadows } from "../../theme/theme-types/ThemeShadows";
import { Omit } from "../../types/Omit";

type StyledSystemProps = AlignItemsProps &
  DisplayProps &
  BorderProps &
  FlexDirectionProps &
  FlexProps &
  FlexWrapProps &
  HeightProps &
  JustifyContentProps &
  MinHeightProps &
  MaxHeightProps &
  MinWidthProps &
  MaxWidthProps &
  WidthProps;

type FlexBoxProps = BoxProps;

type ShadowType = keyof ThemeShadows;

type Div = JSX.IntrinsicElements["div"];

export interface BoxProps extends StyledSystemProps, Div {
  innerRef?: React.Ref<HTMLDivElement>;
  row?: boolean;
  spacing?: boolean | number;
  indent?: boolean | number;
  style?: React.CSSProperties;
  shadow?: ShadowType | BoxShadowProperty;
  background?: ThemeColorField | BackgroundProperty<TLengthStyledSystem>;
}

const FlexBox = styled.div<FlexBoxProps & BoxShadowProps & BackgroundProps>`
  display: ${props => props.display || "flex"};
  ${alignItems};
  ${background};
  ${border};
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
  padding: ${props => numberOrZero(props.spacing) * 10}px
    ${props => numberOrZero(props.indent) * 10}px;
  ${width};
`;

const InnerRefBox: React.FC<BoxProps> = ({
  innerRef,
  shadow,
  background,
  ...props
}) => {
  const boxProps = useThemeSelector(
    ({ shadows, colors }) => ({
      boxShadow: (shadow && shadows[shadow]) || shadow,
      background: (background && colors[background]) || background
    }),
    [shadow, background]
  );
  return <FlexBox ref={innerRef} {...boxProps} {...props} />;
};

export const Box = React.forwardRef<
  HTMLDivElement,
  Omit<PropsWithChildren<BoxProps>, "innerRef">
>((props, ref) => <InnerRefBox innerRef={ref} {...props} />);

const numberOrZero = (num: number | boolean | undefined): number =>
  (num as number) || 0;
