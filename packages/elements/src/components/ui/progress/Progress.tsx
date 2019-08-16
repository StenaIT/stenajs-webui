import * as React from "react";
import { ReactComponent as Spinner } from "./spinner.svg";

export type ProgressSize = "large" | "normal" | "small";

export interface ProgressProps {
  trackColor?: string;
  size?: ProgressSize | string;
}

const sizes = {
  large: "78px",
  normal: "54px",
  small: "28px"
};

export const Progress: React.FC<ProgressProps> = ({
  trackColor = "#bada55",
  size = "normal"
}) => {
  const sizeToUse = (sizes[size] as string | undefined) || size;
  return (
    <Spinner
      height={sizeToUse}
      width={sizeToUse}
      stroke={trackColor}
      style={{ width: sizeToUse, height: sizeToUse }}
    />
  );
};
