import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { Indent, Row, Space } from "@stenajs-webui/core";
import { DepricatedStandardButton } from "@stenajs-webui/elements";
import * as React from "react";
import { CalendarTheme } from "../../components/calendar/CalendarTheme";

export interface WithMonthSwitcherBelowProps {
  theme: CalendarTheme;
  nextMonth: () => void;
  prevMonth: () => void;
}

export const WithMonthSwitcherBelow: React.FC<WithMonthSwitcherBelowProps> = ({
  children,
  prevMonth,
  nextMonth,
  theme
}) => (
  <div>
    {children}
    <Indent>
      <Row>
        <DepricatedStandardButton
          onClick={prevMonth}
          leftIcon={faChevronUp}
          buttonTheme={
            theme && theme.CalendarMonth.SwitchButton
              ? theme.CalendarMonth.SwitchButton
              : undefined
          }
          width={
            theme && theme.CalendarMonth.SwitchButton
              ? theme.CalendarMonth.SwitchButton.width
              : undefined
          }
        />
        <Space />
        <DepricatedStandardButton
          onClick={nextMonth}
          leftIcon={faChevronDown}
          buttonTheme={
            theme && theme.CalendarMonth.SwitchButton
              ? theme.CalendarMonth.SwitchButton
              : undefined
          }
          width={
            theme && theme.CalendarMonth.SwitchButton
              ? theme.CalendarMonth.SwitchButton.width
              : undefined
          }
        />
      </Row>
    </Indent>
    <Space />
  </div>
);
