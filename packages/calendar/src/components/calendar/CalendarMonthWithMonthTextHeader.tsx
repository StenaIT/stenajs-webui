import * as React from "react";
import { Column, Row, Space, Text } from "@stenajs-webui/core";
import { CalendarMonth, CalendarMonthProps } from "./CalendarMonth";

interface CalendarMonthWithMonthTextHeaderProps<T>
  extends CalendarMonthProps<T> {}

export function CalendarMonthWithMonthTextHeader<T>(
  props: CalendarMonthWithMonthTextHeaderProps<T>
) {
  return (
    <Column>
      <Row alignItems={"center"} justifyContent={"center"}>
        <Text>{props.month.name}</Text>
        <Space />
        <Text>{props.month.year}</Text>
      </Row>
      <CalendarMonth {...props} />
    </Column>
  );
}
