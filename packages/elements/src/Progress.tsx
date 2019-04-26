import * as React from "react";
import { ReactComponent as Spinner } from "./spinner.svg";

export interface ProgressProps {
  trackColor?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  trackColor = "#bada55"
}) => {
  return <Spinner stroke={trackColor} />;
};
