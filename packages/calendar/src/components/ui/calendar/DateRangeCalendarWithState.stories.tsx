import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import { addDays } from 'date-fns';
import * as React from 'react';
import { UseTheme } from '../../../src/components/theme';
import {
  DateRangeCalendarWithState,
  extranetCalendarTheme,
  setDayStateValue,
} from '../../../src/components/ui/form/calendar';

let statePerMonthWithTwoWeeksEnabled = {};
for (let i = 1; i < 7; i++) {
  statePerMonthWithTwoWeeksEnabled = setDayStateValue(
    statePerMonthWithTwoWeeksEnabled,
    addDays(new Date(), i),
    {
      highlights: ['enabled'],
    },
  );
}
for (let i = 10; i < 14; i++) {
  statePerMonthWithTwoWeeksEnabled = setDayStateValue(
    statePerMonthWithTwoWeeksEnabled,
    addDays(new Date(), i),
    {
      highlights: ['enabled'],
    },
  );
}

// tslint:disable-next-line
const noop = () => {};

export const addsDateRangeCalendarWithStateStories = () => {
  storiesOf('Form/Calendar/DateRangeCalendarWithState', module)
    .addDecorator(withInfo())
    .add('standard', () => <DateRangeCalendarWithState onChange={noop} />)
    .add('with today highlighted', () => (
      <DateRangeCalendarWithState onChange={noop} highlightToday />
    ))
    .add('with default highlights', () => (
      <DateRangeCalendarWithState
        onChange={noop}
        defaultHighlights={['disabled']}
        statePerMonth={statePerMonthWithTwoWeeksEnabled}
      />
    ))
    .add('with multiple months', () => (
      <DateRangeCalendarWithState onChange={noop} numMonths={3} />
    ))
    .add('with multiple rows', () => (
      <DateRangeCalendarWithState
        onChange={noop}
        numMonths={6}
        monthsPerRow={3}
      />
    ))
    .add('with custom theme', () => (
      <UseTheme
        theme={{
          components: {
            Calendar: extranetCalendarTheme,
          },
        }}
      >
        <DateRangeCalendarWithState
          onChange={noop}
          numMonths={6}
          monthsPerRow={3}
        />
      </UseTheme>
    ));
};
