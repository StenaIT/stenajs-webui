import * as React from "react";
import { useMemo } from "react";
import { Row } from "@stenajs-webui/core";
import { TravelDateTextInput } from "./TravelDateTextInput";
import { createInputMaskForDateFormat } from "../../localize-date-format/InputMaskProvider";
import { getDateFormatForLocaleCode } from "../../localize-date-format/DateFormatProvider";
import { reformatLocalizedDateString } from "../../localize-date-format/LocalizedDateReformatter";
import { TravelCalendarSizeVariant } from "./TravelCalendar";
import { DateTextInputVariant } from "../types";

export interface TravelDateTextInputFieldProps {
  value: string | undefined;
  onValueChange: ((value: string) => void) | undefined;
  localeCode: string;
  label?: string;
  onFocus?: () => void;
  calendarSize: TravelCalendarSizeVariant;
  placeholderWhenBlurred: string | undefined;
  valueWhenBlurred: string | undefined;
  variant: DateTextInputVariant;
}

export const TravelDateTextInputField: React.FC<
  TravelDateTextInputFieldProps
> = ({
  value,
  onValueChange,
  label = "Date",
  localeCode,
  onFocus,
  calendarSize,
  placeholderWhenBlurred,
  valueWhenBlurred,
  variant,
}) => {
  const { mask, placeholder } = useMemo(() => {
    const dateFormatForLocaleCode = getDateFormatForLocaleCode(localeCode);
    return {
      mask: createInputMaskForDateFormat(dateFormatForLocaleCode),
      placeholder: dateFormatForLocaleCode.toLowerCase(),
    };
  }, [localeCode]);

  return (
    <Row>
      <TravelDateTextInput
        mask={mask}
        value={value}
        onValueChange={onValueChange}
        onBlur={(ev) => {
          const date = reformatLocalizedDateString(ev.target.value, localeCode);
          if (date && date !== value) {
            onValueChange?.(date);
          }
        }}
        onFocus={onFocus}
        label={label}
        placeholder={placeholder}
        calendarSize={calendarSize}
        placeholderWhenBlurred={placeholderWhenBlurred}
        valueWhenBlurred={valueWhenBlurred}
        variant={variant}
      />
    </Row>
  );
};
