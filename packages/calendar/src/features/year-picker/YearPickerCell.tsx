import * as React from "react";
import { Row } from "@stenajs-webui/core";
import { FlatButton, PrimaryButton } from "@stenajs-webui/elements";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";

interface Props extends ValueAndOnValueChangeProps<number> {
  year: number;
}

export const YearPickerCell: React.FC<Props> = ({
  value,
  onValueChange,
  year,
}) => {
  const label = String(year);
  return (
    <Row justifyContent={"center"}>
      {value === year ? (
        <PrimaryButton label={label} onClick={() => onValueChange?.(year)} />
      ) : (
        <FlatButton label={label} onClick={() => onValueChange?.(year)} />
      )}
    </Row>
  );
};
