import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import * as React from 'react';
import { ComponentEnhancer, compose } from 'recompose';
import { Button, defaultStandardButtonTheme } from '../../../../buttons';
import { Indent, Row, Space } from '../../../../layout/index';
import { CalendarProps } from '../../types/CalendarTypes';
import {
  MonthSwitcherHandlerProps,
  MonthSwitcherStateProps,
  withMonthSwitcherLogic,
} from './MonthSwitcherLogic';

export type __C121235123518 = ComponentEnhancer<{}, {}>;

type InnerProps = CalendarProps<{}> &
  MonthSwitcherStateProps &
  MonthSwitcherHandlerProps;

const withSwitchButtons = (
  WrappedComponent: React.FC<InnerProps>,
): React.FC<InnerProps> => (props: InnerProps) => (
  <div>
    <WrappedComponent {...props} />
    <Indent>
      <Row>
        <Button
          height={
            props.theme &&
            props.theme.CalendarMonth.SwitchButton &&
            props.theme.CalendarMonth.SwitchButton.height
              ? props.theme.CalendarMonth.SwitchButton.height
              : defaultStandardButtonTheme.height
          }
          onClick={props.prevMonth}
          leftIcon={faChevronUp}
          theme={
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
        <Button
          height={
            props.theme &&
            props.theme.CalendarMonth.SwitchButton &&
            props.theme.CalendarMonth.SwitchButton.height
              ? props.theme.CalendarMonth.SwitchButton.height
              : defaultStandardButtonTheme.height
          }
          onClick={props.nextMonth}
          leftIcon={faChevronDown}
          theme={
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
  withSwitchButtons,
);
