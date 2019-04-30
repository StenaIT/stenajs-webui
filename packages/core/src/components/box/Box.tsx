import styled from "@emotion/styled";
import * as React from "react";
import { useMemo } from "react";
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
  width,
  WidthProps
} from "styled-system";
import { useTheme } from "../../theme/hooks/UseTheme";
import { ThemeShadows } from "../../theme/theme-types/ThemeShadows";

// tslint:disable:no-shadowed-variable

type StyledSystemProps = AlignItemsProps &
  DisplayProps &
  BackgroundProps &
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

export interface BoxProps extends StyledSystemProps {
  innerRef?: React.Ref<HTMLDivElement>;
  row?: boolean;
  spacing?: boolean | number;
  indent?: boolean | number;
  style?: React.CSSProperties;
  shadow?: ShadowType;
}

const FlexBox = styled.div<FlexBoxProps & BoxShadowProps>`
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

export const Box: React.FC<BoxProps> = ({ innerRef, shadow, ...props }) => {
  const { shadows } = useTheme();
  const boxShadow = useMemo(() => shadow && shadows[shadow], [shadows, shadow]);
  return <FlexBox ref={innerRef} {...props} boxShadow={boxShadow} />;
};

const numberOrZero = (num: number | boolean | undefined): number =>
  (num as number) || 0;
