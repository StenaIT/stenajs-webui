import { Indent, Row, Space } from "@stenajs-webui/core";
import {
  FlatButton,
  stenaAngleLeft,
  stenaAngleLeftDouble,
  stenaAngleRight,
  stenaAngleRightDouble,
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
      <Row>
        <FlatButton onClick={prevYear} leftIcon={stenaAngleLeftDouble} />
        <Space />
        <FlatButton onClick={prevMonth} leftIcon={stenaAngleLeft} />
        <Indent num={2} />
        <FlatButton onClick={nextMonth} leftIcon={stenaAngleRight} />
        <Space />
        <FlatButton onClick={nextYear} leftIcon={stenaAngleRightDouble} />
      </Row>
    </Indent>
    <Space />
  </div>
);
