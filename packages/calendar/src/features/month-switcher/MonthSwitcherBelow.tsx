import { Indent, Row, Space } from "@stenajs-webui/core";
import { StandardButton } from "@stenajs-webui/elements";
import * as React from "react";
import { CalendarTheme } from "../../components/calendar/CalendarTheme";
import { faChevronUp } from "@fortawesome/pro-light-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/pro-light-svg-icons/faChevronDown";

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
        <StandardButton
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
        <StandardButton
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
