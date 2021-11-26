# stenajs-webui/filter

This package contains components and functionality that makes it
easy to create custom filters in a drawer, and an overview row containing chips.

This package is alpha. API:s will most likely change, and more features added.
If you use it, be ready for breaking changes.

# The section

A section is one expandable part of the filter. The filter can consist of many sections. Each section can how none, one
or many chips.

# The context

The filter components access state, dispatch and actions. These are fetched from context, so any filter components must
be wrapped with

```tsx
<SearchFilterContext actions={actions} state={state} dispatch={dispatch}>
  <SearchFilterButton/>
  <SearchFilterChips>
    <SectionChips {...stuff} />
  </SearchFilterChips>
  <SearchFilterDrawer>
    ... sections
  </SearchFilterDrawer>
```

If you are only using local state (no Redux, persistence, etc),
you can use `SearchFilterLocalStateContext`.
It will automatically setup actions, state and dispatch.

```tsx
<SearchFilterLocalStateContext<FormModel>
  initialFormModel={{ startDate: undefined, endDate: undefined }}
>
  ... same as above
</SearchFilterLocalStateContext>
```

If you use `SearchFilterLocalStateContext`, you can use this to access filter state.

```tsx
const state = useSearchFilterState();
```

# Custom sections

You can create custom sections easily.

```tsx
const MySection = (...props) => (
  <SearchFilterSection sectionId={sectionId} loading={loading} error={error}>
    <ChipMultiSelect
      options={filteredOptions}
      value={listValue}
      onValueChange={onValueChangeInternal}
      inputValue={text}
      onInputChange={setText}
    />
  </SearchFilterSection>
);
```

See source code for examples.

# Ready-to-use sections

There are sections available ready to use.

More will be made available as the `filter` package matures.

## DateRangeCalendarSection

Add the section to the drawer.

```tsx
<DateRangeCalendarSection
  sectionId={"comparisonDate"}
  {...createDateRangeSectionProps(state.formModel, "startDate", "endDate")}
/>
```

And add the chips.

```tsx
<SectionChips
  sectionId={"comparisonDate"}
  emptyChipLabel={"No dates"}
  {...createChipsPropsForDateRange(state.formModel, "startDate", "endDate")}
/>
```

## ChipMultiSelectSection

Add the section to the drawer. This section does not have a helper method for creating props.

They must be specified manually. This might change.

```tsx
<ChipMultiSelectSection
  sectionId={"divisions"}
  loading={false}
  options={divisionOptions}
  value={state.formModel.divisions}
  onValueChange={(divisions) =>
    dispatch(actions.setFormModelFields({ divisions }))
  }
/>
```

And add the chips.

```tsx
<SectionChips
  sectionId={"divisions"}
  emptyChipLabel={"All division"}
  {...createChipsPropsForBooleanRecord(
    state.formModel,
    "divisions",
    divisionOptions
  )}
/>
```

In this example, `state.formModel.divisions` must be a `BooleanRecord`.

Another section for `BooleanRecord` is `SimpleCheckboxListSection`.
They are API compatible and are interchangeable.

```tsx
<SimpleCheckboxListSection
  sectionId={"divisions"}
  loading={false}
  options={divisionOptions}
  value={state.formModel.divisions}
  onValueChange={(divisions) =>
    dispatch(actions.setFormModelFields({ divisions }))
  }
/>
```

## Chips

You can add all chips for a section using the `SectionChips` component.

```tsx
<SectionChips
  sectionId={"divisions"}
  emptyChipLabel={"All division"}
  {...createChipsPropsForBooleanRecord(
    state.formModel,
    "divisions",
    divisionOptions
  )}
/>
```

### Manual chips

If you need more manual control over each chip, you can add them individually.

```tsx
{
  myList.map(({ value, label }) => (
    <SearchFilterChip
      key={value}
      label={label ?? sectionId}
      sectionId={sectionId}
      onClickRemove={onClickRemoveOnChip}
      value={value}
    />
  ));
}
```

If you need a chip to indicate no selection, you can use `EmptyChip`.

```tsx
<EmptyChip sectionId={sectionId} label={emptyChipLabel} />
```
