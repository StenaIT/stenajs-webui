import * as React from "react";
import {
  getDataProps,
  ScreenReaderOnlyText,
  Space,
  Text,
} from "@stenajs-webui/core";
import { StepIndicatorLine } from "./StepIndicatorLine";
import styles from "./StepIndicatorItem.module.css";
import cx from "classnames";
import { Status } from "./StepIndicatorStatus";

export interface StepIndicatorItemProps {
  id: string;
  label: string;
  screenReaderCurrentStepText: string;
  screenReaderPassedStepText: string;
  status?: Status;
  className?: string;
  lineClassName?: string;
  textClassName?: string;
}

export const StepIndicatorItem: React.FC<StepIndicatorItemProps> = ({
  id,
  label,
  status,
  className,
  screenReaderCurrentStepText,
  screenReaderPassedStepText,
  lineClassName,
  textClassName,
  ...rest
}) => {
  const isCurrentStep = status === "current";
  const isPassedStep = status === "passed";
  const screenReaderStepStatusText = getCurrentScreenReaderStepStatus(
    screenReaderCurrentStepText,
    screenReaderPassedStepText,
    status,
  );
  return (
    <li id={id} className={cx(styles.item, className)} {...getDataProps(rest)}>
      <StepIndicatorLine status={status} className={lineClassName} />
      <Space />
      {screenReaderStepStatusText == null ? null : (
        <ScreenReaderOnlyText>
          {screenReaderStepStatusText}
        </ScreenReaderOnlyText>
      )}
      <Text
        className={cx(
          styles.text,
          isCurrentStep && styles.currentStep,
          isPassedStep && styles.passedStep,
          textClassName,
        )}
      >
        {label}
      </Text>
    </li>
  );
};

const getCurrentScreenReaderStepStatus = (
  screenReaderCurrentStepText: string,
  screenReaderPassedStepText: string,
  status?: Status,
): string | undefined => {
  if (status === "current") {
    return screenReaderCurrentStepText;
  }
  if (status === "passed") {
    return screenReaderPassedStepText;
  }
  return undefined;
};
