import * as React from "react";
import { Ref } from "react";
import {
  FlatButton,
  SecondaryButton,
  stenaAngleDown,
  stenaAngleUp,
  stenaArrowLeft,
  stenaArrowRight,
} from "@stenajs-webui/elements";
import { Row } from "@stenajs-webui/core";
import { addMonths, subMonths } from "date-fns";
import { VisiblePanel } from "../UseTravelDateInput";

export interface MonthHeaderProps {
  monthPickerButtonLabel: string;
  nextMonthButtonAriaLabel: string;
  previousMonthButtonAriaLabel: string;
  visiblePanel: VisiblePanel;
  setVisiblePanel: (panel: VisiblePanel) => void;
  monthPickerButtonRef: Ref<HTMLButtonElement>;
  setVisibleMonth: (date: Date) => void;
  prevMonthDisabled: boolean;
}

export const MonthHeader: React.FC<MonthHeaderProps> = ({
  previousMonthButtonAriaLabel,
  nextMonthButtonAriaLabel,
  monthPickerButtonLabel,
  visiblePanel,
  setVisiblePanel,
  monthPickerButtonRef,
  setVisibleMonth,
  prevMonthDisabled,
}) => {
  return (
    <Row alignSelf={"center"} justifyContent={"space-between"} width={"100%"}>
      <FlatButton
        aria-live={"polite"}
        label={monthPickerButtonLabel}
        rightIcon={visiblePanel === "calendar" ? stenaAngleDown : stenaAngleUp}
        onClick={() =>
          setVisiblePanel(
            visiblePanel === "calendar" ? "month-picker" : "calendar"
          )
        }
        ref={monthPickerButtonRef}
      />
      <Row alignItems={"center"} gap={2}>
        <SecondaryButton
          leftIcon={stenaArrowLeft}
          onClick={() => setVisibleMonth(subMonths(visiblePanel, 1))}
          disabled={prevMonthDisabled}
          aria-label={previousMonthButtonAriaLabel}
        />
        <SecondaryButton
          leftIcon={stenaArrowRight}
          onClick={() => setVisibleMonth(addMonths(visiblePanel, 1))}
          aria-label={nextMonthButtonAriaLabel}
        />
      </Row>
    </Row>
  );
};
