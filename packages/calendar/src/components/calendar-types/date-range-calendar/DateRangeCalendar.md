# DateRangeCalendar

DateRangeCalendar is a controlled component, just like all other form inputs.

It requires a bit more state than the usual `value`:

* startDate
* endDate
* focusedInput

These must be provided as props, as well as their setters.
`value` is not used.

```
<DateRangeCalendar
  startDate={startDate}
  endDate={endDate}
  focusedInput={focusedInput}
  setStartDate={setStartDate}
  setEndDate={setEndDate}
  setFocusedInput={setFocusedInput}
  onChange={onChangeHandler}
/>
```

## onChange

The `onChange` props works as usual, but will provide an object with `{ startDate, endDate }`.

## The hook

You can simplify this by using the provided hook `useDateRangeCalendarState`.

Creating a wrapper component can look like this:

```
  const dateRangeStateProps = useDateRangeCalendarState();

  return <DateRangeCalendar {...dateRangeStateProps} onChange={onChange} />;
```

The hook will provide the required state props, and the user only provides `onChange`.

The component is no longer controlled.  This means that the component controls 
what dates are selected, and you can use `onChange` to listen to changes in the 
selected dates.

### Preselecting dates

If you need to preselect dates, you will have to call the `setStartDate` 
and `setEndDate` methods provided by the hook.
