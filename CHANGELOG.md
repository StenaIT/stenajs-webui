# Changelog

## 2.3.1

### Improvements

#### `SidebarMenu`

- `SidebarMenuLink` now supports `leftIcon`, `rightIcon`, etc, same as buttons.
- `SidebarMenuLink` now has `indent` prop and can be used in `SidebarMenuCollapsible`.
- `StandardTable` configuration now has default `z-index` set to undefined instead of 1000.

### Breaking changes

- Removed `SidebarMenuCollapsibleLink`, just use `SidebarMenuLink` with `indent` prop.
- `StandardTable` option `headerRowZ` to renamed to `headerRowZIndex`.

## 2.3.0

### New components

#### `SidebarMenu`

A menu with a title, links and collapsible menu components

- `SidebarMenuHeading` - a title.
- `SidebarMenuLink` - a link that can be selected and have an icon to the left.
- `SidebarMenuCollapsible` - a component that expands and contracts sub menu items `SidebarMenuCollapsibleLink`.
- `SidebarMenuCollapsibleLink` - a link that can be selected and is contained in a `SidebarMenuCollapsible`.

See stories for examples.

### New features

#### `StandardTable`

- Added option for having a sticky header row as option in `StandardTable`.
- Added option for sticky first column in `StandardTable`.

### Design fixes

- Checkboxes inside text input fields no longer show a checkmark.
- flex-shrink: 0 has been added to checkboxes to retain their size.

### Breaking changes

- --current-icon-color has been renamed to --current-checkbox-icon-color.

## 2.2.0

### New components

#### `ResultListBanner`

A banner that contains a list of results. Can be used when displaying multiple errors.

- `useResultListBannerState`

A hook that contains all state needed for `ResultListBanner`.

It exposes functions for setting the state of the banner.

#### `ResultList`

A list of results, presented in `ul` tag.

### Changes

- `Spinner` has new size `tiny`.

- `Banner` changed to have optional text.

To make room for arbitrary children under header if no text provided.

- `Banner` children (i.e bottom content) is now in proper layout under header and text.
- Added story for Banner with both header, text and bottom content.

## 2.1.0

### Breaking changes

- Button components no longer has `as` prop.

To create links with button look, use `PrimaryButtonLink`, etc.

### New components

- `TabMenu` and `Tab`.

`TabMenu` can have `Tab` elements as children, creating a tab menu bar.
`Tab` have mostly the same props as buttons.

- `CheckboxMenu` in `panels` package.

A checkbox and a menu, with options to quick select checkboxes.

- `ActionMenuButton` in `panels` package.

A flat button with ellipses icon that opens an action menu.

- `PrimaryButtonLink`
- `FlatButtonLink`
- `SecondaryButtonLink`

They are `a` tags with same design and functionality as `PrimaryButton`, etc.

### Improvements

- Updated design of `ActionMenu`.
- Fix issues in buttons where spinner was not aligned correctly.

## 2.0.9

### Bug fix

`reducer-id-gate` did not send action to inner reducer when state was undefined.

## 2.0.8

### Design changes

Increased contrast in `Select` light theme hover states.

### New features

`Banner` component now has `success` & `warning` variants.

### Bug fixes

`DateTextInput` popover content is now wrapped with a popupRef. This fixes a bug where `useMultiOnClickOutside` would
cause the popover to close before being able trigger a change.

`PrimaryButton` is no longer larger than intended on some Windows browsers.

`reducer-id-gate` was calling internal reducer with the action when reducerId did not match, if state was undefined.

## 2.0.7

### New components

- `Label`

Used to add a label to Chip, TextInput or any other component.

### Improvements

- Add `commitEditableEntityToPersisted` action to editable-entity-reducer.
- Remove internal indent in `TableCell` which could break styling of cell.

## 2.0.6

### Hotfix

- `StandardTable` did not apply `minWidth` to header.

## 2.0.5

### New features

- Added `minWidth` field to StandardTable column config.

### Fixes

- Fix `Collapsible`, did not expand properly.

### Other changes

- Switch `Collapsible` collapse/expand arrows.

## 2.0.4

### New features

#### `Popover`

- Added `lazy` prop to `Popover`. When enabled, the popover content is not rendered until popover is opened.

#### Calendar

- All calendars in popups are now lazy rendered.

## 2.0.3

### Improvements

#### Calendar

- Updated styling to look more like design system.

### Fixes

#### `DateRangeDualTextInput`

- Fix shadow in text inputs.

## 2.0.2

### Improvements

#### Calendar

- Updated styling to look more like design system.
- Updated to correct colors in default theme.
- Updated the calendar theme to use CSS prop based theme, instead of context based theme.

### Breaking changes

- The calendar theme `TravelCalendarTheme` has been removed.

## 2.0.1

### New features

#### `Banner`

New component for showing information and errors.

### Improvements

#### `StandardTable`

Column configs `itemLabelFormatter` now gets `item` as second argument.

#### `DateRangeDualTextInput`

- Escape key now closes the calendar popover.
- Clicking on already selected month/year returns to the calendar.
- Too large intervals no longer crashes calendar.
- `YearPicker` no longer scrolls to new year in focus.

#### `useGridCell`

- Key down events that contain shift, cmd or ctrl are no longer captured.

#### `Popover`

- There are no longer warnings in console from Tippy.

## 2.0.0

### New features

#### `DateRangeDualTextInput`

New component `DateRangeDualTextInput` which has the same functionality as `DateRangeInput`.

It does not replace it though, since they are not API compatible.

#### `CenterModal`

New modal which is centered and not draggable.

#### `LoadingModal`

New modal for showing loading/saving state.

### Improvements

- Add `revertEditableEntity` action to `editable-entity-reducer`.
- All calendars now has a panel for quickly selecting month and year.

### Design changes

- Disabled `ActionMenuItem` now has white background.

### Breaking changes

- `Months` enum have been renamed to `Month`.
- `WeekDays` enum have been renamed to `WeekDay`.

#### `Popover`

`Popover` now uses Tippy, and Tippy's props. This means that some props have changed.

Most importantly, content and children can no longer be functions. If you need the hide and show functions, implement
them using local state and the Popover `visible` props.

## 1.2.0

### New features

- `entity-list-reducer` has new action `actionOnAll`, which applies child action to all items.
- New reducer factory `editable-entity-reducer` which contains persisted and editable instances of entity.

### Breaking changes

- `Select` has been updated according to design system. Resulting in removal of its theme property.
- `Select` now has a variant property that can be either light or dark.

## 1.1.1

### Hotfix

- Fix focus on DateRangeInput when moving from start date to end date.

## 1.1.0

### Breaking changes

- No longer clearing `StandardTable` state when new data is fetched.

This caused prefilled checkboxes to be cleared.

This must now be handled manually when there is new data in the table without it being unmounted between renders.

- DateRangeInput now allows invalid date range.

Previously, it would switch start date and end date if start date was after end date. Instead, it now highlights the
inputs with error highlight.

This means that you are no longer guaranteed that the range is valid.

## 1.0.8

### Bug fix

onChange did not properly use latest value in editor cells.

## 1.0.7

### Hotfix

`reducerIdGate` did not handle actions with unexpected form. Such actions can be dispatched by Redux itself, or
middlewares. Such actions are now just passed down to the internal reducer, which can handle the actions as they see
fit.

## 1.0.6

#### Redux package types updated

It now uses type `Reducer` type from `redux` instead of `react`. This makes it compatible with `combineReducers` from
Redux.

## 1.0.5

### Improvements

- `Select` component now has the same focused box shadow that is used in input fields.
- `Link` component now uses an 1px outline instead of border.
- `StandardTableConfig` now infers column names from row object automatically.
- `StandardTableConfig` now supports expand collapse button in header row (set `showHeaderExpandCollapse` to `true`)

#### New actions for `StandardTable`

`StandardTable` is now using new higher order reducers, which require composing nested actions. This made it harder to
create actions in the apps, and these new actions help.

- selectByIds(ids)
- clearSelection()
- expandByIds(ids)
- collapseAll()
- sortBy(columnId, desc?)
- clearSortOrder()

New actions are exposed by `useLocalStateTableContext` hook, and can be created manually
using `createStandardTableActions` function.

### Breaking changes

- New actions are breaking, if the app is using them via `useLocalStateTableContext`.
- `useLocalStateTableContext` now accepts an `initialState` parameter instead of `initialSortOrder`
  and `initialSortOrderDesc`.
  - Use `createStandardTableInitialState` to maintain compatibility.

## 1.0.4

### Improvements

- `Collapsible` now has `autoFocus` and `innerRef` properties.
- `PrimaryButton` now has an `as` property to allow it to be rendered as an anchor instead of a button. This also
  affects `SecondaryButton` and `FlatButton`.
- `CollapsibleClickableContent` now passes its remaining properties to its `Clickable`.
- `@types/react-modal` has been bumped to allow setting an `id` property to the modal element.

### Fixes

- `Chip` close button negative margin of 1px removed.
- `Checkbox`'s :after pseudo element now uses box-sizing: content-box by default. This fixes an issue where in the case
  where all pseudo elements globally is set to use something other than content-box, resulted in a too small checkmark.
- `Space` now doesn't flex, making it keep its size in a flexbox context.
- `ModalHeader` now uses the primary font.

## 1.0.3

### Breaking changes

#### Changes to reducer factories.

All reducer factories have been updated to no longer accept reducerId. The reason for this is the new reducerIdGate
higher order reducer.

Compose with `reducerIdGate` to get same functionality, and use `reducerIdGateAction` to create actions.

### New features

- Add higher order reducers `recordObjectReducer` and `reducerIdGate`.

### Bug fixes

- NavBar in a Column would expand the NavBar to be higher than 50px.

## 1.0.2

### New features

- Add new generic reducer entity-list-reducer.
- Add support for center content in NavBar

## 1.0.1

### Improvements

#### useGridNavigation/useGridCell hook

- Now has new setting, `edgeMode`, which defines how to behave when user tries to navigate outside of table.

#### StandardTable has new options.

- tableId can now be set, but is optional.
- rowIndexOffset and colIndexOffset.
- Now possible to navigate between tables, when combining edgeMode, shared tableId and index offsets.
- initialSortOrder.
- disableSorting. Disables onClicks on table heads, only initialSortOrder is applied.

## 1.0.0

### Changes

- DateRangePicker now has an arrow between fields, instead of text "to".

### Fixes

- DateRangePicker calendar background is now white instead of transparent.
- DateRangePicker cell content could break column alignment if it was too big. This has been fixed.

## 1.0.0-beta.3

### New components

- New TextArea component in forms package.

### New features

- useArraySet now supports custom comparator.

Use custom comparator to use useArraySet with objects.

- Popover now automatically resizes and moves when content resizes.

### Fixes

- Fix styling of UpDownButtons in Firefox.

## 1.0.0-beta.2

- Hot fix, fixes invalid peer dependencies.

## 1.0.0-beta.1

- StandardTable supports expandable rows.
- Chip has more variants.

## 1.0.0-beta.0

### New components

- StandardTable

A table component with support for sorting, selecting rows, custom cell renderers, support for grid navigation, etc.

Can be used with Redux state, or internal state.

### New features

- Add more higher order reducers.

## 1.0.0-alpha.2

### Bug fixes

- TextInput onChange and onKeyDown props no longer overwrite internal handlers.

#### TextInput onKeyDown prop

`onKeyDown` was not receiving enter or escape. All other calls were also disabled when `onMove` was set. This has
changed. `onKeyDown` now always receives all key down events.

## 1.0.0-alpha.1

- Hover and focus combined with variants in `TextInput` have been updated according to design system.
- Added Link focus highlight.
- Improved focus highlight on Chip.

## 1.0.0-alpha.0

### PSA

- We are moving from React context based theme to CSS variables.
- We are also starting to implement components using HTML elements and CSS modules, instead of `core` components.

### New components

- Link
- PrimaryButton
- Collapsible

### Updated components

These components have new implementations, built with HTML and CSS modules.

- TextInput
- Badge
- Checkbox
- RadioButton
- Chip
- Modal

### Breaking changes

#### RadioButton

- `RadioButton` no longer extends value/onChange interface. Instead, it is a normal HTML input field with type `radio`.

#### Badge

- Badge props changed. `color` and `textColor` have been removed, and `type` has been added.
- Badge now uses CSS vars.

#### TextInput

- `StandardTextInput` has been renamed to `TextInput`.
- `focusOnMount` prop removed. Use `autoFocus` instead.
- `selectAllOnMount` no longer autofocuses field. Add `autoFocus` as well.
- Icon colors and background can no longer be set. Use `variant` prop instead.

### Calendars

- Calendar inputs no longer support themes, since text input uses CSS properties.
- Calendar inputs have `calendarTheme` prop which is passed to the calendar.

## 0.0.51

- Revert
  - Bump react-storybook from `^5.2.5` to `^5.3.9`.
  - Add `fsevents` dependency to lower CPU usage on macOS.

## 0.0.50

- Fix Typescript errors in calendar package.

## 0.0.49

- Modals are now draggable. Off by default, enable with prop `draggable`.

### Fixes

- Make it possible to change height of `StandardTextInput`.
- `GroupedMultiSelect`, add group heading font family styling.
- `BaseModal` now has `draggable` prop and can be used by setting `DRAGGABLE_HANDLE_CLASSNAME` as className on your drag
  handle.

### Internal

- Bump react-storybook from `^5.2.5` to `^5.3.9`.
- Add `fsevents` dependency to lower CPU usage on macOS.

## 0.0.48

Bug fix release.

### Fixes

- `GroupedMultiSelect`, fix bug when removing the last item in a group.
- `BaseModal` max width is set to 100%.
- `Button` height is applied to wrapping `Clickable`, instead of inner `Box`.

## 0.0.47

### Fixes

- `NumericTextInput` passes `disabled` prop down to child `StandardTextInput`.
- `StandardTextInput` uses prop `backgroundColor` when getting one.

## 0.0.46

### Fixes

- NumericTextInput correctly shows contentRight without padding when stepper buttons are hidden.
- Text inputs no longer use `setSelectionRange` when type is number.

### Internal

- Upgrade to Typescript 3.7.2, including eslint, rollup and other dependencies.
- Upgrade `madge`, now supports Typescript 3.7.

## 0.0.45

### Breaking changes

- ActionMenu is no longer position absolute.

### New features

- Add z-index prop to ActionDropdown.

### Fixes

- Button component spreads props down to HTML button element.

## 0.0.44

​

### Breaking changes

​

- Resolve correct theme color for `Select`.
- Upgrade `Select` from `v2` to `v3`.
- Uniform heights for `text input` and `select`. ​

### New features

- Add possibility to set active color for `options` in `Select menu`.
- Add onKeyDown event for `Checkbox`. ​

### Storybook

​

- Add `all` story for `Form`-section in `storybook`. ​

### Internal

​

- Upgrade storybook to latest version, `5.2.5`.

## 0.0.43

- Allow inputs `-+*<>` in grid when `allowedInputType='all'`.
- Fix bug when de-selecting option header in `GroupedMultiSelect`.
- Spread input props in `StandardTextInput` to `input`.

## 0.0.42

### Fixes

- Fix bug when popping option from `GroupedMultiSelect`.
- Fix bug when selecting option in `GroupedMultiSelect`.

## 0.0.41

### Fixes

- Fix bug when deselecting option from `GroupedMultiSelect`.

## 0.0.40

### Fixes

- `onRequestClose` on `Modal` and `BaseModal` props is now optional.

## 0.0.39

### Breaking changes

- `MultiDateCalendar` is renamed to `DateRangeExclusionCalendar`.
- `onRequestClose` on `Modal` and `BaseModal` props is no longer optional. Fixed in 0.0.40.

### New components

- Add new `MultiDateCalendar`.
- Add `GroupedMultiSelect` component.

### New features

- Add `portalTarget` to `Popover`.
- add `portalTarget` to `DateTextInput`, `DateInput` and `DateRangeInput`.

## 0.0.38

- New theme for calendar `travelCalendarTheme`.
- Add unit tests for hooks.
- Add more flexbox props to `Box`.
- Add intrinsic div element types to `Box` props type.
- Add selected item hover colors in `select`.

- Calendar
  - Add `cellSpacing` to `CalendarMonthTheme`.
  - Add `HeaderLeftIcon` and `HeaderRightIcon` to `CalendarMonthTheme` to be able to use custom icons in month switcher
    buttons.
  - Add `borderColor`, `borderRadius` and `rangeBorderRadius` to `CalendarDay`'s `wrapperStyle`.
  - Add `rangeBackground`, `verticalExpand` and `horizontalExpand` to `CalendarDay`'s `innerWrapperStyle`.

## 0.0.37

- Add `color` in theme for `multiValue` in `Select`.
- Fix typings for `useBoolean`hook.
- Add innerRef to all buttons.
- Fix a bug in textInput that caused console to log error for MozAppearance.

## 0.0.36

- Add `ActionMenu` and `ActionDropdown` component to `elements`.
- Add `useElementFocus` hook to `core`.
- Add `useMouseIsEntered` hook to `core`.

## 0.0.35

- Upgrade `date-fns` to `2.0.1`.
- Add `show` option to `WeekNumber` config used in `CalenderMonth`
- Add new highlight states to `DayStateHighlight`: `selectedStart` and `selectedEnd`. For compatibility reasons the
  selected days hove both the old `selected` AND `selectedStart` and/or `selectedEnd`
- Add `rangeTextColor` to `CalendarDay`'s `textProps`
- Add `borderColor` (and `borderColorDisabled`) to `ButtonTheme`.

## 0.0.34

- Add first version of `@stenajs-webui/redux`.
- Add `commit-reducer` feature for Redux.
- Add `Drawer` component.
- Add `useArraySet` hook.
- Update design of `Spinner`.
- Add `InputSpinner` which is used in buttons and input fields.
- Merge the two individual theme prop for calendar and text input into one common theme prop for `DateTextInput`.
- Add `fontWeight` to `ButtonTheme`.
- Remove letter spacing in buttons.

## 0.0.33

- Add first version of `@stenajs-webui/tooltip`.
- Add `WithTooltip` component.
- Add `MultiDateCalendar` component. User can select range as well as toggle individual dates.
- Add standardized sizes to `Progress`, `small`, `normal`, `large`.
- Add `invalid` prop to `StandardTextInput` with updated theme.
- `Progress` `size` prop now sets height (previously only set width).
- `recompose` is no longer a dependency on any of the packages.
- `calendar` package has been refactored and no longer depends on `recompose`.
- Clickable forwards DOM attribute props, such as id and className.
- Build process includes imports checker, that checks that imported modules are specified as dependency in package.json.
- Add `useDomId` hook to `core`. Generates a unique id, that is guaranteed to persist through component lifecycle.
- Fix eslint in build process.

## 0.0.32

- Add first version of `@stenajs-webui/input-mask`.
- Add `MaskedStandardTextInput` component, and `useMaskedInput` hook.
- `Box` is now responsive. `width` and `height` props can take array of values.
  - See https://styled-system.com/responsive-styles for more info.
- `padding` CSS rule is no longer set on `Box` div element, when spacing and indent are not set.
- Add stories for responsive `Box`.
- Add story for aria label on `Box`.

## 0.0.31

- Add first version of `@stenajs-webui/modal`
- `ThemeProvider` now merges the provided theme with the theme from parent context
- Add missing dependency for `useCallback` in `Checkbox` causing `onValueChange` to become outdated

## 0.0.30

- Set `box-sizing: border-box` on `Box`
- Fix centering for `Icon`
  - This also centers `Checkbox` icon

## 0.0.29

- Fix hard dependency on `fontawesome-common-types`
- Fix warning for babel emotion plugin

## 0.0.28

- Fix a bug in `Checkbox` that caused `onChange`/`onValueChange` to be called twice

## 0.0.27

- Replace `lodash-es` with `lodash`

## 0.0.26

- Allow `.` and `/` in `DateTextInput`
- Add support for `indeterminate` to `Checkbox`.
- Add ability to hide left side icon in `DateTextInput`.

## 0.0.25

- Add `HeaderText` component.
- Add `LoadingScreen` and `LoadingPanel` components.
- Add `ErrorScreen` and `ErrorPanel` components.
- Add `Notification` component.
- Fix styling of grid in grid examples.

## 0.0.24

- Add `NavBar`, `NavBarButton` and `NavBarMenuButton`.
- Add prop `textColor` to `Button`.
- Add `ToggleButton` component.
- Add `Badge` and `WithBadge` components.
- Add `textAlign` prop to all Text components.
