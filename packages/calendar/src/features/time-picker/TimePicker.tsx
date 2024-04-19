import { Indent, Row } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { range } from "lodash-es";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  formatHours,
  formatMinutes,
} from "../../util/time/TimeStringFormatValidator";
import { getHoursAndMinutesFromTimeString } from "../../util/time/TimeTransformer";
import styles from "./TimePicker.module.css";
import { TimePickerColumn } from "./TimePickerColumn";

export interface TimePickerProps extends ValueAndOnValueChangeProps<string> {}

const hours = range(0, 24);
const minutes = range(0, 60);

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onValueChange,
}) => {
  const canScrollRef = useRef(true);
  const [hour, setHour] = useState<number | undefined>(undefined);
  const [minute, setMinute] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (value) {
      const { minute, hour } = getHoursAndMinutesFromTimeString(value);
      setHour(hour);
      setMinute(minute);
    }
  }, [value]);

  const onClickHour = useCallback(
    (h: number) => {
      setHour(h);
      onValueChange?.(
        `${formatHours(String(h ?? 0))}:${formatMinutes(String(minute ?? 0))}`
      );
    },
    [minute, onValueChange]
  );

  const onClickMinutes = useCallback(
    (m: number) => {
      setMinute(m);
      onValueChange?.(
        `${formatHours(String(hour ?? 0))}:${formatMinutes(String(m ?? 0))}`
      );
    },
    [hour, onValueChange]
  );

  return (
    <Row className={styles.timePicker}>
      <TimePickerColumn
        items={hours}
        onClick={onClickHour}
        selectedItem={hour}
        canScrollRef={canScrollRef}
      />
      <Indent />
      <TimePickerColumn
        items={minutes}
        onClick={onClickMinutes}
        selectedItem={minute}
        canScrollRef={canScrollRef}
      />
    </Row>
  );
};
