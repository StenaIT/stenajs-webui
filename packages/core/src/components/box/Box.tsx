import styled from "@emotion/styled";
import * as React from "react";
import {
  alignItems,
  AlignItemsProps,
  background,
  BackgroundProps,
  border,
  BorderProps,
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
  WidthProps,
  width
} from "styled-system";

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

export interface BoxProps extends StyledSystemProps {
  innerRef?: React.Ref<HTMLDivElement>;
  row?: boolean;
  spacing?: boolean | number;
  indent?: boolean | number;
  style?: React.CSSProperties;
}
const FlexBox = styled.div<FlexBoxProps>`
  display: ${props => props.display || "flex"};
  ${alignItems};
  ${background};
  ${border};
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

export const Box: React.FC<BoxProps> = ({ innerRef, ...props }) => {
  return <FlexBox ref={innerRef} {...props} />;
};

const numberOrZero = (num: number | boolean | undefined): number =>
  (num as number) || 0;
