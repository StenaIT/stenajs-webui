import styled from "@emotion/styled";
import * as React from "react";

export interface SpaceProps {
  half?: boolean;
  horizontal?: boolean;
  num?: number;
  vertical?: boolean;
}

const InnerSpace = styled.div<{
  num: number;
  vertical: boolean;
  horizontal: boolean;
}>`
  flex: none;
  --current-size: ${({ num }) => num};
  width: ${({ vertical }) =>
    vertical ? "1px" : "calc(var(--current-size) * var(--swui-metrics-space))"};
  height: ${({ horizontal }) =>
    horizontal
      ? "1px"
      : "calc(var(--current-size) * var(--swui-metrics-space))"};
`;

export const Space: React.VFC<SpaceProps> = ({
  half = false,
  horizontal = false,
  num = 1,
  vertical = false,
}) => {
  const size = num * (half ? 0.5 : 1);

  return <InnerSpace num={size} horizontal={horizontal} vertical={vertical} />;
};
