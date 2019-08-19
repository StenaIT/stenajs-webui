import * as React from "react";
import { LargeSpinner } from "./LargeSpinner";
import { ReactComponent as Spinner } from "./spinner.svg";

export type ProgressSize = "large" | "normal" | "small";

export interface ProgressProps {
  trackColor?: string;
  size?: ProgressSize | string;
}

const sizes = {
  large: "78px",
  normal: "54px",
  small: "20px"
};

export const Progress: React.FC<ProgressProps> = ({
  trackColor = "#bada55",
  size = "normal"
}) => {
  const sizeToUse = (sizes[size] as string | undefined) || size;
  if (size === "small11") {
    return (
      <Spinner
        height={sizeToUse}
        width={sizeToUse}
        stroke={trackColor}
        style={{ width: sizeToUse, height: sizeToUse }}
      />
    );
  }

  return <LargeSpinner size={sizeToUse} />;
};
