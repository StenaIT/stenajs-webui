import * as React from "react";
import { useMemo } from "react";
import { Row } from "@stenajs-webui/core";
import { TravelDateInputValue } from "../TravelDateInput";
import { TravelDateTextInput } from "./TravelDateTextInput";
import { createInputMaskForDateFormat } from "../../../../features/localize-date-format/InputMaskProvider";
import { getDateFormatForLocaleCode } from "../../../../features/localize-date-format/DateFormatProvider";
import { reformatLocalizedDateString } from "../../../../features/localize-date-format/LocalizedDateReformatter";

export interface TravelDateTextInputsProps {
  value: TravelDateInputValue | undefined;
  onValueChange: (value: Partial<TravelDateInputValue>) => void;
  localeCode: string;
  startDateLabel?: string;
  endDateLabel?: string;
}

export const TravelDateTextInputs: React.FC<TravelDateTextInputsProps> = ({
  value,
  onValueChange,
  localeCode,
  startDateLabel = "From",
  endDateLabel = "To",
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
        label={endDateLabel}
        borderRadiusVariant={"onlyRight"}
        placeholder={placeholder}
      />
    </Row>
  );
};
