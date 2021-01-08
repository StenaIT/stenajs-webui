import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { Column, Row } from "@stenajs-webui/core";
import { YearPickerCell } from "./YearPickerCell";
import { FlatButton } from "@stenajs-webui/elements";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import { chunk, range } from "lodash";

export interface YearPickerProps extends ValueAndOnValueChangeProps<number> {
  initialLastYear?: number;
}

export const YearPicker: React.FC<YearPickerProps> = ({
  value,
  onValueChange,
  initialLastYear,
}) => {
  const [lastYear, setLastYear] = useState(() => {
    if (value) {
      return value + 4;
    }
    return initialLastYear ?? new Date().getFullYear() + 4;
  });

  const yearRows = useMemo(() => {
    const startYear = lastYear - 11;
    return chunk(range(startYear, lastYear + 1), 3);
  }, [lastYear]);

  useEffect(() => {
    setLastYear((prev) => calculateLastYearInFocus(value, prev));
  }, [value]);

  return (
    <Row>
      <Column justifyContent={"center"}>
        <FlatButton
          leftIcon={faCaretLeft}
          onClick={() => setLastYear(lastYear - 3)}
        />
      </Column>
      <Column>
        {yearRows.map((yearRow) => (
          <Row key={yearRow[0]}>
            {yearRow.map((year) => (
              <YearPickerCell
                key={year}
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

const calculateLastYearInFocus = (
  value: number | undefined,
  lastYear: number
): number => {
  if (value == null) {
    return lastYear;
  }
  if (value > lastYear) {
    const yearDiff = value - lastYear;
    const remaining = yearDiff % 3;
    const yearsToAdd = yearDiff - remaining + 3;
    return lastYear + yearsToAdd;
  }
  const startYear = lastYear - 11;
  if (value < startYear) {
    const yearDiff = startYear - value;
    const remaining = yearDiff % 3;
    const yearsToSubtract = yearDiff - remaining + 3;
    return lastYear - yearsToSubtract;
  }

  return lastYear;
};
