import { Row } from "@stenajs-webui/core";
import { FlatButton, PrimaryButton } from "@stenajs-webui/elements";
import * as React from "react";
import { RefObject, useEffect, useRef } from "react";

export interface TimePickerCellProps {
  item: number;
  selected?: boolean;
  onClick: (label: number) => void;
  columnRef: RefObject<HTMLDivElement>;
  canScroll: RefObject<boolean>;
  onScroll: () => void;
}

export const TimePickerCell: React.FC<TimePickerCellProps> = ({
  onClick,
  item,
  selected,
  columnRef,
  canScroll,
  onScroll,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    function scrollToSelectedItem() {
      if (selected && columnRef.current && ref.current && canScroll.current) {
        const targetScroll = ref.current.scrollHeight * Math.max(item - 2, 0);
        columnRef.current.scrollTo(0, targetScroll);
        onScroll();
      }
    },
    [columnRef, onScroll, item, selected, canScroll]
  );

  return (
    <Row
      width={"64px"}
      justifyContent={"center"}
      spacing={0.5}
      indent={0.5}
      ref={ref}
    >
      {selected ? (
        <PrimaryButton
          label={String(item)}
          onClick={() => onClick && onClick(item)}
        />
      ) : (
        <FlatButton
          label={String(item)}
          onClick={() => onClick && onClick(item)}
        />
      )}
    </Row>
  );
};
