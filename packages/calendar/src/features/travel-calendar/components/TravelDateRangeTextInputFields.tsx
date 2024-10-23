import * as React from "react";
import { useMemo } from "react";
import { Row } from "@stenajs-webui/core";
import { TravelDateTextInput } from "./TravelDateTextInput";
import { createInputMaskForDateFormat } from "../../localize-date-format/InputMaskProvider";
import { getDateFormatForLocaleCode } from "../../localize-date-format/DateFormatProvider";
import { reformatLocalizedDateString } from "../../localize-date-format/LocalizedDateReformatter";
import { DateTextInputVariant, TravelDateRangeInputValue } from "../types";
import { TravelCalendarSizeVariant } from "./TravelCalendar";
import { SupportedLocaleCode } from "../../localize-date-format/LocaleMapper";

export interface TravelDateRangeTextInputFieldsProps {
  value: TravelDateRangeInputValue | undefined;
  onValueChange:
    | ((value: Partial<TravelDateRangeInputValue>) => void)
    | undefined;
  localeCode: SupportedLocaleCode;
  startDateLabel?: string;
  endDateLabel?: string;
  onFocus?: () => void;
  calendarSize: TravelCalendarSizeVariant;
  placeholderWhenBlurredStartDate: string | undefined;
  placeholderWhenBlurredEndDate: string | undefined;
  valueWhenBlurredStartDate: string | undefined;
  valueWhenBlurredEndDate: string | undefined;
  variant: DateTextInputVariant;
}

export const TravelDateRangeTextInputFields: React.FC<
  TravelDateRangeTextInputFieldsProps
> = ({
  value,
  onValueChange,
  localeCode,
  startDateLabel = "From",
  endDateLabel = "To",
  onFocus,
  calendarSize,
  placeholderWhenBlurredStartDate,
  placeholderWhenBlurredEndDate,
  valueWhenBlurredStartDate,
  valueWhenBlurredEndDate,
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
        value={value?.startDate}
        onValueChange={(v) => {
          onValueChange?.({ startDate: v });
        }}
        onBlur={(ev) => {
          const startDate = reformatLocalizedDateString(
            ev.target.value,
            localeCode,
          );
          if (startDate && startDate !== value?.startDate) {
            onValueChange?.({ startDate });
          }
        }}
        onFocus={onFocus}
        label={startDateLabel}
        borderRadiusVariant={"onlyLeft"}
        placeholder={placeholder}
        placeholderWhenBlurred={placeholderWhenBlurredStartDate}
        valueWhenBlurred={valueWhenBlurredStartDate}
        calendarSize={calendarSize}
        variant={variant}
      />
      <TravelDateTextInput
        mask={mask}
        value={value?.endDate}
        onValueChange={(v) => onValueChange?.({ endDate: v })}
        onBlur={(ev) => {
          const endDate = reformatLocalizedDateString(
            ev.target.value,
            localeCode,
          );
          if (endDate && endDate !== value?.endDate) {
            onValueChange?.({ endDate });
          }
        }}
        onFocus={onFocus}
        label={endDateLabel}
        borderRadiusVariant={"onlyRight"}
        placeholder={placeholder}
        placeholderWhenBlurred={placeholderWhenBlurredEndDate}
        valueWhenBlurred={valueWhenBlurredEndDate}
        calendarSize={calendarSize}
        variant={variant}
      />
    </Row>
  );
};
