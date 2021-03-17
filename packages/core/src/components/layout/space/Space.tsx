import * as React from "react";

export interface SpaceProps {
  half?: boolean;
  horizontal?: boolean;
  num?: number;
  vertical?: boolean;
}

export const Space: React.VFC<SpaceProps> = ({
  half = false,
  horizontal = false,
  num = 1,
  vertical = false,
}) => {
  const halfMod = half ? 0.5 : 1.0;
  const size = num * halfMod;
  return (
    <div
      style={{
        width: vertical ? "1px" : `calc(${size} * var(--swui-metrics-space))`,
        height: horizontal
          ? "1px"
          : `calc(${size} * var(--swui-metrics-space))`,
        flex: "none",
      }}
    />
  );
};
