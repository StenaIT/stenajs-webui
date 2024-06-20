import * as React from "react";
import { Row } from "@stenajs-webui/core";
import {
  LabelledTextInput,
  ValueAndOnValueChangeProps,
} from "@stenajs-webui/forms";
import { TravelDateInputValue } from "../TravelDateInput";

export interface TravelDateTextInputsProps
  extends ValueAndOnValueChangeProps<TravelDateInputValue> {}

export const TravelDateTextInputs: React.FC<TravelDateTextInputsProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <Row>
      <LabelledTextInput
        value={value?.startDate}
        onValueChange={(v) =>
          onValueChange?.({ startDate: v, endDate: value?.endDate })
        }
        label={"To"}
        borderRadiusVariant={"onlyLeft"}
      />
      <LabelledTextInput
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
