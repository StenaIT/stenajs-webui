import { isNil } from "lodash";
import { parseFloatElseUndefined } from "@stenajs-webui/core";

export const isMinReached = (
  value: string | undefined,
  min: number | undefined
) => {
  if (!isNil(value)) {
    const numericValue = parseFloatElseUndefined(value);
    return !isNil(numericValue) && !isNil(min) && numericValue <= min;
  } else {
    return false;
  }
};

export const isMaxReached = (
  value: string | undefined,
  max: number | undefined
) => {
  if (!isNil(value)) {
    const numericValue = parseFloatElseUndefined(value);
    return !isNil(numericValue) && !isNil(max) && numericValue >= max;
  } else {
    return false;
  }
};
