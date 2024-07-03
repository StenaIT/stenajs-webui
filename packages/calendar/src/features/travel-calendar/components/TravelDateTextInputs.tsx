import * as React from "react";
import { useMemo } from "react";
import { Row } from "@stenajs-webui/core";
import { TravelDateTextInput } from "./TravelDateTextInput";
import { createInputMaskForDateFormat } from "../../localize-date-format/InputMaskProvider";
import { getDateFormatForLocaleCode } from "../../localize-date-format/DateFormatProvider";
import { reformatLocalizedDateString } from "../../localize-date-format/LocalizedDateReformatter";
import { TravelDateRangeInputValue } from "../types";

export interface TravelDateTextInputsProps {
  value: TravelDateRangeInputValue | undefined;
  onValueChange: ((value: Partial<TravelDateRangeInputValue>) => void) | undefined;
  localeCode: string;
  startDateLabel?: string;
  endDateLabel?: string;
  onFocus?: () => void;
}

export const TravelDateTextInputs: React.FC<TravelDateTextInputsProps> = ({
  value,
  onValueChange,
  localeCode,
  startDateLabel = "From",
  endDateLabel = "To",
  onFocus,
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
            localeCode
          );
          if (startDate && startDate !== value?.startDate) {
            onValueChange?.({ startDate });
          }
        }}
        onFocus={onFocus}
        label={startDateLabel}
        borderRadiusVariant={"onlyLeft"}
        placeholder={placeholder}
      />
      <TravelDateTextInput
        mask={mask}
        value={value?.endDate}
        onValueChange={(v) => onValueChange?.({ endDate: v })}
        onBlur={(ev) => {
          const endDate = reformatLocalizedDateString(
            ev.target.value,
            localeCode
          );
          if (endDate && endDate !== value?.endDate) {
            onValueChange?.({ endDate });
          }
        }}
        onFocus={onFocus}
        label={endDateLabel}
        borderRadiusVariant={"onlyRight"}
        placeholder={placeholder}
      />
    </Row>
  );
};
