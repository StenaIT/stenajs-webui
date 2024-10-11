import { Row } from "@stenajs-webui/core";
import { FlatButton, PrimaryButton } from "@stenajs-webui/elements";
import * as React from "react";
import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import { padStart } from "lodash-es";

export interface TimePickerCellProps {
  item: number;
  selected?: boolean;
  onClick: (label: number) => void;
  columnRef: RefObject<HTMLDivElement>;
  canScrollRef: MutableRefObject<boolean>;
}

export const TimePickerCell: React.FC<TimePickerCellProps> = ({
  onClick,
  item,
  selected,
  columnRef,
  canScrollRef,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    function scrollToSelectedItem() {
      if (
        selected &&
        columnRef.current &&
        ref.current &&
        canScrollRef.current
      ) {
        const targetScroll = ref.current.scrollHeight * Math.max(item - 2, 0);
        columnRef.current.scrollTo(0, targetScroll);
        canScrollRef.current = false;
      }
    },
    [columnRef, item, selected, canScrollRef],
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
          label={padStart(String(item), 2, "0")}
          onClick={() => onClick && onClick(item)}
        />
      ) : (
        <FlatButton
          label={String(item).padStart(2, "0")}
          onClick={() => onClick && onClick(item)}
        />
      )}
    </Row>
  );
};
