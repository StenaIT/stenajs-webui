import { Indent, Row, Space } from "@stenajs-webui/core";
import {
  FlatButton,
  stenaAngleLeft,
  stenaAngleRight,
} from "@stenajs-webui/elements";
import * as React from "react";
import { CalendarTheme } from "../../components/calendar/CalendarTheme";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons/faAngleDoubleLeft";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons/faAngleDoubleRight";
import { ReactNode } from "react";

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
        <FlatButton onClick={prevYear} leftIcon={faAngleDoubleLeft} />
        <Space />
        <FlatButton onClick={prevMonth} leftIcon={stenaAngleLeft} />
        <Indent num={2} />
        <FlatButton onClick={nextMonth} leftIcon={stenaAngleRight} />
        <Space />
        <FlatButton onClick={nextYear} leftIcon={faAngleDoubleRight} />
      </Row>
    </Indent>
    <Space />
  </div>
);
