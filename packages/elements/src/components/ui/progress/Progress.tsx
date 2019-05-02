import * as React from "react";
import { ReactComponent as Spinner } from "./spinner.svg";

export interface ProgressProps {
  trackColor?: string;
  size?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  trackColor = "#bada55",
  size
}) => {
  return <Spinner stroke={trackColor} style={{ width: size }} />;
};
