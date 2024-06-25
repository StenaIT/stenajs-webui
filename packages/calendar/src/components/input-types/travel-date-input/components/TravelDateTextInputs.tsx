import * as React from "react";
import { Row } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { TravelDateInputValue } from "../TravelDateInput";
import { TravelDateTextInput } from "./TravelDateTextInput";
import { InputMasks } from "@stenajs-webui/input-mask";

export interface TravelDateTextInputsProps
  extends ValueAndOnValueChangeProps<TravelDateInputValue> {}

export const TravelDateTextInputs: React.FC<TravelDateTextInputsProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <Row>
      <TravelDateTextInput
        mask={InputMasks.ISO_DATE}
        value={value?.startDate}
        onValueChange={(v) =>
          onValueChange?.({ startDate: v, endDate: value?.endDate })
        }
        label={"To"}
        borderRadiusVariant={"onlyLeft"}
      />
      <TravelDateTextInput
        mask={InputMasks.ISO_DATE}
        value={value?.endDate}
        onValueChange={(v) =>
          onValueChange?.({ startDate: value?.startDate, endDate: v })
        }
        label={"From"}
        borderRadiusVariant={"onlyRight"}
      />
    </Row>
  );
};
