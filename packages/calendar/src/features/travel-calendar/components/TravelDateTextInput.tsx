import * as React from "react";
import {
  LabelledTextInput,
  LabelledTextInputProps,
} from "@stenajs-webui/forms";
import { useRef } from "react";
import {
  InputMask,
  InputMaskPipe,
  InputMaskProvider,
  useMaskedInput,
} from "@stenajs-webui/input-mask";
import { TravelCalendarSizeVariant } from "./TravelCalendar";
import { exhaustSwitchCase } from "@stenajs-webui/core";

export interface TravelDateTextInputProps extends LabelledTextInputProps {
  mask: InputMask | InputMaskProvider;
  pipe?: InputMaskPipe;
  guide?: boolean;
  keepCharPositions?: boolean;
  placeholderChar?: string;
  showMask?: boolean;
  calendarSize: TravelCalendarSizeVariant;
}

export const TravelDateTextInput: React.FC<TravelDateTextInputProps> = ({
  onChange,
  onValueChange,
  mask,
  pipe,
  value,
  guide,
  keepCharPositions,
  placeholderChar,
  showMask,
  calendarSize,
  ...inputProps
}) => {
  const inputRef = useRef(null);
  const { onChange: maskedOnChange } = useMaskedInput(
    inputRef,
    onChange,
    onValueChange,
    mask,
    pipe,
    value,
    guide,
    keepCharPositions,
    placeholderChar,
    showMask
  );

  return (
    <LabelledTextInput
      {...inputProps}
      ref={inputRef}
      onChange={maskedOnChange}
      width={getWidth(calendarSize)}
      size={calendarSize === "large" ? "large" : "medium"}
    />
  );
};

const getWidth = (calenderSize: TravelCalendarSizeVariant) => {
  // For cell size = 48px, (48*7)/2 = 168px
  switch (calenderSize) {
    case "small":
      return "140px";
    case "medium":
      return "168px";
    case "large":
      return "196px";
    default:
      return exhaustSwitchCase(calenderSize, "168px");
  }
};
