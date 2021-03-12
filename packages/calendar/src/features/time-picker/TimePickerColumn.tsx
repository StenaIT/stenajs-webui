import { Column } from "@stenajs-webui/core";
import { useRef } from "react";
import * as React from "react";
import styles from "./TimePicker.module.css";
import { TimePickerCell } from "./TimePickerCell";

interface Props {
  items: Array<number>;
  onClick: (item: number) => void;
  selectedItem: number | undefined;
  canScroll: boolean;
  onScroll: () => void;
}

export const TimePickerColumn: React.FC<Props> = ({
  onClick,
  items,
  selectedItem,
  canScroll,
  onScroll,
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
          canScroll={canScroll}
          onScroll={onScroll}
        />
      ))}
    </Column>
  );
};
