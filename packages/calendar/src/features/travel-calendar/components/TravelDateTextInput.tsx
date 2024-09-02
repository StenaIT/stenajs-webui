import * as React from "react";
import {
  LabelledTextInput,
  LabelledTextInputProps,
} from "@stenajs-webui/forms";
import { FocusEventHandler, useCallback, useRef, useState } from "react";
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
  placeholderWhenBlurred: string | undefined;
  valueWhenBlurred: string | undefined;
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
  onFocus,
  onBlur,
  placeholderWhenBlurred,
  placeholder,
  valueWhenBlurred,
  ...inputProps
}) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

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
    showMask,
    isFocused
  );

  const onFocusHandler = useCallback<FocusEventHandler<HTMLInputElement>>(
    (ev) => {
      onFocus?.(ev);
      setIsFocused(true);
    },
    [onFocus]
  );

  const onBlurHandler = useCallback<FocusEventHandler<HTMLInputElement>>(
    (ev) => {
      onBlur?.(ev);
      setIsFocused(false);
    },
    [onBlur]
  );

  const activePlaceholder = isFocused
    ? placeholder
    : placeholderWhenBlurred ?? placeholder;

  return (
    <LabelledTextInput
      {...inputProps}
      aria-live={"polite"}
      value={!isFocused ? valueWhenBlurred : undefined}
      ref={inputRef}
      placeholder={activePlaceholder}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
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
