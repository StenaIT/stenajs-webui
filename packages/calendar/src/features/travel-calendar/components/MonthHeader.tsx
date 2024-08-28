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
import { VisiblePanel } from "../types";
import { TravelCalendarSizeVariant } from "./TravelCalendar";

export interface MonthHeaderProps {
  monthPickerButtonLabel: string;
  nextMonthButtonAriaLabel: string;
  previousMonthButtonAriaLabel: string;
  visiblePanel: VisiblePanel;
  setVisiblePanel: (panel: VisiblePanel) => void;
  monthPickerButtonRef: Ref<HTMLButtonElement>;
  visibleMonth: Date;
  setVisibleMonth: (date: Date) => void;
  prevMonthDisabled: boolean;
  calendarSize: TravelCalendarSizeVariant;
  previousMonthButtonTestId?: string;
  nextMonthButtonTestId?: string;
}

export const MonthHeader: React.FC<MonthHeaderProps> = ({
  previousMonthButtonAriaLabel,
  nextMonthButtonAriaLabel,
  monthPickerButtonLabel,
  visiblePanel,
  setVisiblePanel,
  monthPickerButtonRef,
  setVisibleMonth,
  visibleMonth,
  prevMonthDisabled,
  calendarSize,
  previousMonthButtonTestId,
  nextMonthButtonTestId,
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
        size={calendarSize === "small" ? "medium" : "large"}
      />
      <Row alignItems={"center"} gap={2}>
        <SecondaryButton
          leftIcon={stenaArrowLeft}
          onClick={() => setVisibleMonth(subMonths(visibleMonth, 1))}
          disabled={prevMonthDisabled}
          aria-label={previousMonthButtonAriaLabel}
          size={calendarSize === "small" ? "medium" : "large"}
          data-testid={previousMonthButtonTestId}
        />
        <SecondaryButton
          leftIcon={stenaArrowRight}
          onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
          aria-label={nextMonthButtonAriaLabel}
          size={calendarSize === "small" ? "medium" : "large"}
          data-testid={nextMonthButtonTestId}
        />
      </Row>
    </Row>
  );
};
