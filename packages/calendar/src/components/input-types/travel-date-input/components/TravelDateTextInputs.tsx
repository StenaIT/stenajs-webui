import * as React from "react";
import { useMemo } from "react";
import { Row } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { TravelDateInputValue } from "../TravelDateInput";
import { TravelDateTextInput } from "./TravelDateTextInput";
import { createInputMaskForDateFormat } from "../../../../features/localize-date-format/InputMaskProvider";
import { getDateFormatForLocaleCode } from "../../../../features/localize-date-format/DateFormatProvider";

export interface TravelDateTextInputsProps
  extends ValueAndOnValueChangeProps<TravelDateInputValue> {
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
        onValueChange={(v) =>
          onValueChange?.({ startDate: v, endDate: value?.endDate })
        }
        label={startDateLabel}
        borderRadiusVariant={"onlyLeft"}
        placeholder={placeholder}
      />
      <TravelDateTextInput
        mask={mask}
        value={value?.endDate}
        onValueChange={(v) =>
          onValueChange?.({ startDate: value?.startDate, endDate: v })
        }
        label={endDateLabel}
        borderRadiusVariant={"onlyRight"}
        placeholder={placeholder}
      />
    </Row>
  );
};
