import * as React from "react";
import { useThemeSelector } from "../../../theme/hooks/UseThemeSelector";

export interface SpaceProps {
  half?: boolean;
  horizontal?: boolean;
  num?: number;
  vertical?: boolean;
}

export const Space: React.FC<SpaceProps> = ({
  children,
  half = false,
  horizontal = false,
  num = 1,
  vertical = false,
}) => {
  const space = useThemeSelector((theme) => theme.metrics.space, []);

  const halfMod = half ? 0.5 : 1.0;
  const size = num * halfMod;
  return (
    <div
      style={{
        width: vertical ? "1px" : `${size * space}px`,
        height: horizontal ? "1px" : `${size * space}px`,
        flex: "none",
      }}
    >
      {children}
    </div>
  );
};
