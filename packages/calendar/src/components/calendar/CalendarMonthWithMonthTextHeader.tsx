import * as React from "react";
import { Column, Row, Space, StandardText } from "@stenajs-webui/core";
import { CalendarMonth, CalendarMonthProps } from "./CalendarMonth";

interface CalendarMonthWithMonthTextHeaderProps<T>
  extends CalendarMonthProps<T> {}

export function CalendarMonthWithMonthTextHeader<T>(
  props: CalendarMonthWithMonthTextHeaderProps<T>
) {
  return (
    <Column>
      <Row alignItems={"center"} justifyContent={"center"}>
        <StandardText>{props.month.name}</StandardText>
        <Space />
        <StandardText>{props.month.year}</StandardText>
      </Row>
      <CalendarMonth {...props} />
    </Column>
  );
}
