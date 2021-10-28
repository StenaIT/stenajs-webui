import { parseFloatElseUndefined } from "@stenajs-webui/core";

export const onStepValueChange = ({
  onValueChange,
  value,
  numSteps,
  min,
  max,
}: {
  onValueChange: ((value: string) => void) | undefined;
  value: string | undefined;
  numSteps: number;
  min: number | undefined;
  max: number | undefined;
}) => {
  if (onValueChange) {
    if (!value) {
      onValueChange(String(limitWithinRange(numSteps, min, max)));
    } else {
      const parsedValue = parseFloatElseUndefined(value);
      const newValue = (parsedValue || 0) + numSteps;
      onValueChange(String(limitWithinRange(newValue, min, max)));
    }
  }
};

export const onTextValueChange = ({
  onValueChange,
  newValue,
  min,
  max,
}: {
  onValueChange: ((value: string) => void) | undefined;
  newValue: string;
  min: number | undefined;
  max: number | undefined;
}) => {
  if (onValueChange) {
    if (newValue === "") {
      onValueChange("");
    } else {
      const parsedValue = parseFloatElseUndefined(newValue);
      const value = parsedValue || 0;
      onValueChange(String(limitWithinRange(value, min, max)));
    }
  }
};

const limitWithinRange = (
  value: number,
  min?: number,
  max?: number
): number => {
  let v = value;
  if (min != null) {
    v = Math.max(min, v);
  }
  if (max != null) {
    v = Math.min(max, v);
  }
  return v;
};
