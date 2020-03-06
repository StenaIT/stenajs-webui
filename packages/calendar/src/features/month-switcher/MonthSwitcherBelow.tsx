import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { Indent, Row, Space } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
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
  nextMonth
}) => (
  <div>
    {children}
    <Indent>
      <Row>
        <PrimaryButton onClick={prevMonth} leftIcon={faChevronUp} />
        <Space />
        <PrimaryButton onClick={nextMonth} leftIcon={faChevronDown} />
      </Row>
    </Indent>
    <Space />
  </div>
);
