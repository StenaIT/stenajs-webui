import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { Indent, Row, Space } from "@stenajs-webui/core";
import { StandardButton } from "@stenajs-webui/elements";
import * as React from "react";
import { ComponentEnhancer, compose } from "recompose";
import { CalendarProps } from "../../types/CalendarTypes";
import {
  MonthSwitcherHandlerProps,
  MonthSwitcherStateProps,
  withMonthSwitcherLogic
} from "./MonthSwitcherLogic";

export type __C121235123518 = ComponentEnhancer<{}, {}>;

type InnerProps = CalendarProps<{}> &
  MonthSwitcherStateProps &
  MonthSwitcherHandlerProps;

const withSwitchButtons = (
  WrappedComponent: React.FC<InnerProps>
): React.FC<InnerProps> => (props: InnerProps) => (
  <div>
    <WrappedComponent {...props} />
    <Indent>
      <Row>
        <StandardButton
          onClick={props.prevMonth}
          leftIcon={faChevronUp}
          buttonTheme={
            props.theme && props.theme.CalendarMonth.SwitchButton
              ? props.theme.CalendarMonth.SwitchButton
              : undefined
          }
          width={
            props.theme && props.theme.CalendarMonth.SwitchButton
              ? props.theme.CalendarMonth.SwitchButton.width
              : undefined
          }
        />
        <Space />
        <StandardButton
          onClick={props.nextMonth}
          leftIcon={faChevronDown}
          buttonTheme={
            props.theme && props.theme.CalendarMonth.SwitchButton
              ? props.theme.CalendarMonth.SwitchButton
              : undefined
          }
          width={
            props.theme && props.theme.CalendarMonth.SwitchButton
              ? props.theme.CalendarMonth.SwitchButton.width
              : undefined
          }
        />
      </Row>
    </Indent>
    <Space />
  </div>
);

export const withMonthSwitcherBelow = compose(
  withMonthSwitcherLogic,
  withSwitchButtons
);
