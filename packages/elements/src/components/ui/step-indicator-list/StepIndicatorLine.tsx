import * as React from "react";
import styles from "./StepIndicatorLine.module.css";
import cx from "classnames";
import { Status } from "./StepIndicatorStatus";

export interface StepIndicatorLineProps {
  status?: Status;
  className?: string;
}

export const StepIndicatorLine: React.FC<StepIndicatorLineProps> = ({
  status,
  className,
}) => {
  const isCurrentStep = status === "current";
  const isPassedStep = status === "passed";
  return (
    <div
      className={cx(
        styles.line,
        isCurrentStep && styles.currentStep,
        isPassedStep && styles.passedStep,
        className,
      )}
    />
  );
};
