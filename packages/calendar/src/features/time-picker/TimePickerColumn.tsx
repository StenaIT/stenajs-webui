import { Column } from "@stenajs-webui/core";
import * as React from "react";
import { MutableRefObject, useRef } from "react";
import styles from "./TimePicker.module.css";
import { TimePickerCell } from "./TimePickerCell";

interface Props {
  items: Array<number>;
  onClick: (item: number) => void;
  selectedItem: number | undefined;
  canScrollRef: MutableRefObject<boolean>;
}

export const TimePickerColumn: React.FC<Props> = ({
  onClick,
  items,
  selectedItem,
  canScrollRef,
}) => {
  const columnRef = useRef<HTMLDivElement>(null);

  return (
    <Column className={styles.timePickerColumn} ref={columnRef}>
      {items.map((item) => (
        <TimePickerCell
          key={item}
          item={item}
          onClick={onClick}
          selected={item === selectedItem}
          columnRef={columnRef}
          canScrollRef={canScrollRef}
        />
      ))}
    </Column>
  );
};
