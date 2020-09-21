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
    <Row width={"64px"} justifyContent={"center"} spacing={0.5} indent={0.5}>
      {value === year ? (
        <PrimaryButton label={label} />
      ) : (
        <FlatButton
          label={label}
          onClick={() => onValueChange?.(year)}
        />
      )}
    </Row>
  );
};
