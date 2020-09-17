import * as React from "react";
import { useMemo, useState } from "react";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { Column, Row } from "@stenajs-webui/core";
import { chunk } from "lodash";
import { YearPickerCell } from "./YearPickerCell";
import { FlatButton } from "@stenajs-webui/elements";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";

interface Props extends ValueAndOnValueChangeProps<number> {
  initialLastYear?: number;
}

export const YearPicker: React.FC<Props> = ({
  value,
  onValueChange,
  initialLastYear
}) => {
  const [lastYear, setLastYear] = useState(
    () => initialLastYear || new Date().getFullYear()
  );

  const yearRows = useMemo(
    () =>
      chunk(
        new Array(12).fill(null).map((_, i) => lastYear - (11 - i)),
        3
      ),
    [lastYear]
  );

  return (
    <Row>
      <Column justifyContent={"center"}>
        <FlatButton
          leftIcon={faCaretLeft}
          onClick={() => setLastYear(lastYear - 3)}
        />
      </Column>
      <Column>
        {yearRows.map(yearRow => (
          <Row>
            {yearRow.map(year => (
              <YearPickerCell
                year={year}
                onValueChange={onValueChange}
                value={value}
              />
            ))}
          </Row>
        ))}
      </Column>
      <Column justifyContent={"center"}>
        <FlatButton
          leftIcon={faCaretRight}
          onClick={() => setLastYear(lastYear + 3)}
        />
      </Column>
    </Row>
  );
};
