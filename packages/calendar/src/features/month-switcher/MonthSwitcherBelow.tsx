import { Indent, Row, Space } from "@stenajs-webui/core";
import {
  SecondaryButton,
  stenaAngleLeftDouble,
  stenaAngleRightDouble,
  stenaArrowLeft,
  stenaArrowRight,
} from "@stenajs-webui/elements";
import * as React from "react";
import { ReactNode } from "react";
import { CalendarTheme } from "../../components/calendar/CalendarTheme";

export interface WithMonthSwitcherBelowProps {
  theme: CalendarTheme;
  nextMonth: () => void;
  prevMonth: () => void;
  nextYear: () => void;
  prevYear: () => void;
  children?: ReactNode;
}

export const WithMonthSwitcherBelow: React.FC<WithMonthSwitcherBelowProps> = ({
  children,
  prevMonth,
  nextMonth,
  prevYear,
  nextYear,
}) => (
  <div>
    {children}
    <Indent>
      <Row gap={1}>
        <SecondaryButton onClick={prevYear} leftIcon={stenaAngleLeftDouble} />
        <SecondaryButton onClick={prevMonth} leftIcon={stenaArrowLeft} />
        <Indent num={2} />
        <SecondaryButton onClick={nextMonth} leftIcon={stenaArrowRight} />
        <SecondaryButton onClick={nextYear} leftIcon={stenaAngleRightDouble} />
      </Row>
    </Indent>
    <Space />
  </div>
);
