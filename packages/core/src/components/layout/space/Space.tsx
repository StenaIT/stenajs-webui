import * as React from "react";
import { styled } from "../../../styled";

export interface SpaceProps {
  half?: boolean;
  horizontal?: boolean;
  num?: number;
  vertical?: boolean;
}

const InnerSpace = styled.div`
  --current-size: 1;
  flex: none;
  width: calc(var(--current-size) * var(--swui-metrics-space));
  height: calc(var(--current-size) * var(--swui-metrics-space));
`;

export const Space: React.VFC<SpaceProps> = ({
  half = false,
  horizontal = false,
  num = 1,
  vertical = false,
}) => {
  const size = num * (half ? 0.5 : 1);

  return (
    <InnerSpace
      style={{
        ["--current-size" as string]: size,
        height: horizontal ? 1 : undefined,
        width: vertical ? 1 : undefined,
      }}
    />
  );
};
