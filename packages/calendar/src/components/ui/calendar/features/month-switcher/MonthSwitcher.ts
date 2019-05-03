import { branch, compose } from 'recompose';
import { CalendarProps } from '../../types/CalendarTypes';
import { withMonthSwitcherBelow } from './MonthSwitcherBelow';
import { withMonthSwitcherInHeader } from './MonthSwitcherInHeader';
import { withMonthSwitcherLogic } from './MonthSwitcherLogic';

export type MonthSwitcherPlacement = 'header' | 'below';

export interface WithMonthSwitcherProps extends CalendarProps<{}> {
  /** Placement of month switch buttons. 'header' is default, unless numMonths is >1, then 'below' is default. */
  monthSwitcherPlacement?: MonthSwitcherPlacement;
}

export const withMonthSwitcher = compose<
  WithMonthSwitcherProps,
  WithMonthSwitcherProps
>(
  withMonthSwitcherLogic,
  branch<WithMonthSwitcherProps>(
    props => getMonthSwitcherPlacement(props) === 'header',
    withMonthSwitcherInHeader,
  ),
  branch<WithMonthSwitcherProps>(
    props => getMonthSwitcherPlacement(props) === 'below',
    withMonthSwitcherBelow,
  ),
);

const getMonthSwitcherPlacement = ({
  monthSwitcherPlacement,
  numMonths,
}: WithMonthSwitcherProps): MonthSwitcherPlacement => {
  if (monthSwitcherPlacement) {
    return monthSwitcherPlacement;
  }
  if (numMonths && numMonths > 1) {
    return 'below';
  }
  return 'header';
};
