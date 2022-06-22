import { Indent, Row, Space } from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
import * as React from "react";
import { CalendarTheme } from "../../components/calendar/CalendarTheme";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
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
        <FlatButton onClick={prevMonth} leftIcon={faAngleLeft} />
        <Indent num={2} />
        <FlatButton onClick={nextMonth} leftIcon={faAngleRight} />
        <Space />
        <FlatButton onClick={nextYear} leftIcon={faAngleDoubleRight} />
      </Row>
    </Indent>
    <Space />
  </div>
);
