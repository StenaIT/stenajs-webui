import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { Column, Row } from "@stenajs-webui/core";
import { YearPickerCell } from "./YearPickerCell";
import { FlatButton } from "@stenajs-webui/elements";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import { eachYearOfInterval } from "date-fns";
import { chunk } from "lodash";

interface Props extends ValueAndOnValueChangeProps<number> {
  initialLastYear?: number;
}

export const YearPicker: React.FC<Props> = ({
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

  console.log("lastYear", lastYear);

  const yearRows = useMemo(() => {
    const startYear = lastYear - 11;
    const years = eachYearOfInterval({
      start: new Date(startYear, 1, 1),
      end: new Date(lastYear, 1, 1),
    });
    return chunk(
      years.map((y) => y.getFullYear()),
      3
    );
  }, [lastYear]);

  useEffect(() => {
    if (!value) {
      return;
    }
    if (value > lastYear) {
      const yearDiff = value - lastYear;
      const remaining = yearDiff % 3;
      const yearsToAdd = yearDiff - remaining + 3;
      setLastYear(lastYear + yearsToAdd);
    }
    const startYear = lastYear - 11;
    if (value < startYear) {
      const yearDiff = startYear - value;
      const remaining = yearDiff % 3;
      const yearsToSubtract = yearDiff - remaining + 3;
      setLastYear(lastYear - yearsToSubtract);
    }
  }, [value, lastYear]);

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
