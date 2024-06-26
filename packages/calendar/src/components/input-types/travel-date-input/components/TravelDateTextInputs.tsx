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
}

export const TravelDateTextInputs: React.FC<TravelDateTextInputsProps> = ({
  value,
  onValueChange,
  localeCode,
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
        label={"To"}
        borderRadiusVariant={"onlyLeft"}
        placeholder={placeholder}
      />
      <TravelDateTextInput
        mask={mask}
        value={value?.endDate}
        onValueChange={(v) =>
          onValueChange?.({ startDate: value?.startDate, endDate: v })
        }
        label={"From"}
        borderRadiusVariant={"onlyRight"}
        placeholder={placeholder}
      />
    </Row>
  );
};
