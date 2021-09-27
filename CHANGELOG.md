# Changelog

## Next

### Minor changes

- Darker shade for success color

## 13.3.0

### StandardTable

- User can now shift+click on checkboxes to select/deselect a range of rows.

## 13.2.0

### NumericStepper

- New component `NumericStepper` is a number input with step buttons on the sides

### Collapsible

- Replace `:focus` with `:focus-visible`, this makes the focus state visible only if the `Collapsible` was opened with keyboard interaction.
- Remove top border for `CollapsibleGroupHeading`.

### Bug fixes

- `NumericInput` now caps typed-in values to min and max

### Minor changes

- Icon buttons ignore flex to keep their width

## 13.1.2

- Fix missing export of `value-by-id-reducer`.

## 13.1.1

### New reducer factory `value-by-id-reducer`

- Stores one value per `string` id.

### StandardTable

- Fix missing key warning.

### ActionMenuItem

- Replace `:focus` with `:focus-visible`, this makes the focus state visible only if the menu was opened with keyboard interaction.

## 13.1.0

### useEditableCell

New option `none` for option `allowedInputType`.
This disables the ability to automatically open the editor when the user starts typing in an editable table cell.

This is usable when the editor is not a text input field.

### Design changes

- Updated styling for `Collapsible`.

## 13.0.7

### StandardTable

- Shadow under sticky header now shows under header where there are no columns.

## 13.0.6

### New component `GroupedChipMultiSelect`

- A combination of `ChipMultiSelect` and `GroupedMultiSelect`

### StandardTable

- When all columns had fixed width, they would still get wider than specified when table was wider.

### Modal

- `ModalHeader` is once again draggable by default.
- Buttons and tooltips inside `ModalHeader` are not draggable.
- `headerText` in `ModalHeader` is not draggable.
- `DRAGGABLE_CANCEL_CLASSNAME` can be used to make part of `ModalHeader` not draggable.
  Remember to use this for text that should be selectable in all browsers (e.g. Firefox).
- New prop `closeButtonClassName` for `ModalHeader` lets you set a classname for the close button.
- The close button now has an aria-label ("Close").

## 13.0.5

### StandardTable

- Table heads and cells have correct width when specified.
- Sorting in table could cause empty rows.

## 13.0.4

### StandardTable

- Fix some cases where cell did not align left/right properly.

## 13.0.3

### StandardTable

- When `backgroundResolver` returned undefined for a sticky column, it became see-through.

## 13.0.2

### StandardTable

- Slight refactoring to make `StandardTableCellUi` more backward compatible.

## 13.0.1

### StandardTable

- Fix column group warning being rendered below sticky elements.

## 13.0.0

### ModalHeader

- `ModalHeader` is no longer draggable by default if used outside of `Modal`.

### Spinner

- Spinner has updated animation.

### ActionMenuButton

- Allows for custom `onClick` events

### New hook `useOnScreen`

This hook can be used to determine if a DOM element is visible on screen.

It returns a boolean, true if the element is visible in viewport.

It uses the Intersection Observer API.

Example:

```
  const ref = useRef(null);

  const visible = useOnScreen(ref, {
    rootMargin: "400px",
    threshold: 0,
  });

  return <div ref={ref}>...</div>
```

### StandardTable

- `StandardTable` now uses `<table>` internally.
- Columns can now be sticky to the right.
- When using column groups, only column groups can be sticky, not single columns.
- New optional option `stickyColumnGroups` when using column groups. Can be `first`, `last` or `both`.
- When using `stickyColumnGroups`, all columns in that group must have fixed width.
- Column option `flex` no longer supported. Use `width` and `%` instead.

### Breaking changes

- `StandardTable` column config no longer supports `flex`.

This is because `StandardTable` uses `<table>` internally, which
doesn't support flex.

Use `width` with `%` instead.

## 12.0.0

### StandardTable

- `renderCell` receives options argument.
- `renderCell` function now receives `isSelected` flag. True if checkbox is checked.
- Fixed bug where `left` was improperly set when
  `stickyCheckboxColumn` was true but `showRowCheckbox` was false.
- Column group now has `error` property, which displays an error triangle to the right of the label.
- Fix problem where `contentRight` in column group could not be interacted with.

### ChipMultiSelect

- Small chip wrapping fix.

### Modal

- Restricted the draggable area of a modal to the new handle on the left.
  You can add more areas by adding the `DRAGGABLE_HANDLE_CLASSNAME` to any element in the modal header.

### Breaking changes

#### StandardTable

`renderCell` has changed its arguments.

It now receives an options object as argument instead of multiple arguments.

Change from:

```
// Old
renderCell: (label, item) => (
// New
renderCell: ({ label, item }) => (
```

## 11.3.1

### ButtonContent

- `rightIcon` has no margin if it is the first child

## 11.3.0

### ActionMenu

- Action menu items now support same props as buttons and tabs.
- `ActionMenuItemContent` has new prop `bottom` to show content below.
  - New prop `fullWidthBottomContent` which removes the left space reserved for icons and loading states.

### UseTimeoutState

- Add new hook useTimeoutState.

### Buttons

- Add margin to right content.

### Breaking changes

- Action menu items have updated set of props.

## 11.2.0

### ActionMenuLink

- Prop `onClick` now has same type as HTML a-tag onClick.

### Heading

- `Heading` now supports `as` prop, which can be `h1`-`h6`.

## 11.1.0

### General updates

- Increase contrast for text with action, such as Link and Crumb.
- Text no longer wraps in tabs, buttons and `SideMenuLink`.

### RadioButton and Checkbox

- Add different focus highlight when checked.

### FlatButton

- Icon now has correct color when `FlatButton` is inverted.

## 11.0.0

### ErrorPanel and ErrorScreen

- Updated to use `Banner` instead of icon and text.

### LoadingModal

- `LoadingModal` has been redesigned. The props are the same as before.

### LoadingPanel and LoadingScreen

- Updated to look more like `LoadingModal`.

### Cards

New components for creating cards, `Card`, `CardHeader` and `CardBody`.

Example:

```tsx
<Card>
  <CardHeader text={"Overview"} />
  <CardBody>
    <Text>Lorem ipsavablasfasofofa</Text>
  </CardBody>
</Card>
```

### NavBar

- `NavBarButton` icon now has same color as the text.

### ButtonGroup

- `ButtonGroup` no longer has outer margin.

### reducerIdGate

Add helper function for wrapping actions with reducerIdGate action.

```
export const myActionsWithGate = wrapActionsWithReducerIdGate(reducerId, {
  ...myActions,
};
```

It returns the same actions, but wrapped with reducerIdGate action.

### ActionMenu

- All types of `ActionMenuButton` support keyboard navigation, whether `portalTarget` is used or not
- `ActionMenuItem` has new props `id` and `loading`
- `ActionMenuItem` receives the HTML `disabled` prop when disabled
- `ActionMenuLink` can be triggered with Space, just like `ActionMenuItem`
- `ActionMenuLink` has border radius if first or last child, just like `ActionMenuItem`
- The text in `ActionMenuItem` and `ActionMenuLink` does not wrap
- New component `ActionMenuLinkContent` which can be used to display an item that is not a button.
- `ActionMenu` no longer has default width, it is flexed instead.

### StandardTable

- Sort order icon `amount` variant now has inverted arrow direction.
- When using editable cells, `editorValue` was not always reset and could
  become inconsistent with the value of the data.
  `editorValue` is now always reset when editor for a cell is opened.
- `rowBackgroundResolver` can now return color or object containing `background` and `hoverBackground` fields.
- `headerRowOffsetTop` does now also set the offset for grouped rows if `headerRowOffsetTop` & `stickyHeader` are true

### RadioButton

- `RadioButton` has fixed width, i.e. will not be squashed when content is competing for space

### Dependencies

Font awesome icons have been updated to `5.15.3`.

### Breaking changes

- Font awesome dependencies must be updated.
- `ActionMenu` no longer has default width.

## 10.1.2

### StandardTable

- `rowBackgroundResolver` function now gets `selected` as second argument.
  This makes it possible to change background color depending on
  the checkbox being checked or not.

## 10.1.1

### Select

- Fix types for select components, which cause auto-complete to not work.

### StandardTable

- Fix sort order comparator, did not sort properly between null and falsy values.

## 10.1.0

### ActionMenuButton

- Add `zIndex` prop.

### StandardTable

- Fixed bug regarding sticky header checkbox with column groups. Column group names was showing behind the checkbox when scrolling horizontally.
- Fix alignment issue when using column groups and borders.

## 10.0.0

### Text

- Now also exported with name `Txt`.
  This makes auto-import work properly, since `Text` is already defined globally.

### StandardTable

- Now uses `Banner` to show no items available message.
- Add props `noItemsContentRight`, `noItemsContentBottom`
  and `noItemsHeader` to customize the banner.
- Sort order icon is on left or right side of column header
  label, depending on header alignment.
- Add sort order icon variants, can be set in table config.
  There is one option for the whole table, and one per config
  which overrides the table setting.
- Row checkbox column can now be sticky.
- Fixed visual bug in column group when column is sticky.

### Banner

- Design updated to make it slightly more compact.

### Select

- Update `react-select` to 4.3.0.
- New components `MultiSelect` and `AsyncMultiSelect` replaces `isMulti` prop.
- New `ChipMultiSelect` component.

### DateTextInput

- Moved icon to right side, and changed it to a FlatButton.
  This makes the input slightly wider.

### Breaking changes

- `Select` no longer supports `isMulti` prop.
- `AsyncSelect` no longer supports `isMulti` prop.
- `DateTextInput` is now slightly wider by default.

### Dependency updates

Emotion has been updated to major 11.

React has been updated to major 17.

If any of these dependencies are included in your applications
package.json, you should update them.

- `@emotion/core` is removed.
- `@emotion/react@11.1.5` is added.
- `@emotion/styled@11.3.0`
- `react@17.0.2`
- `react-dom@17.0.2`
- `lodash@4.17.21`
- `csstype@3.0.8`
- `@types/lodash@4.14.168`
- `@types/react@17.0.5`
- `@types/react-dom@17.0.3`

## 9.1.3

- Fix bug introduced in 9.1.2 where border-radius was not applied in `ActionMenuItem`.

## 9.1.2

### StandardTable

- Added `stickyCheckboxColumn` which is a boolean.
- Fixed the positioning of the checkboxes and other elements in the table if `stickyCheckboxColumn` is true or not.

### StandardTable

- Added `stickyCheckboxColumn` which is a boolean.
- Fixed the positioning of the checkboxes and other elements in the table if `stickyCheckboxColumn` is true or not.

### ActionMenu

- Icons in `ActionMenuItem` have a fixed width, aligning the text between items.
- `ActionMenuLink` has the same indent as `ActionMenuItem`.

### ActionMenuButton

- Add `portalTarget` prop.

## 9.1.1

### Modal

- Close button is aligned to top of modal header

### ValueTable

- Adds `variant` prop with values "relaxed", "standard", "condensed", "compact".

## 9.1.0

### Select

- Updated design to look more like design system.

### StandardTableHtmlCopyToClipboardButton

- When exporting to clipboard, all horizontal column alignments
  will be rendered according to the table config.

### Spinner

- `Spinner` only has one color now.
- Removed `Spinner` variant `large`.

### Banner

- `Banner` icon has fixed width and will no longer be compressed by long content.

### Buttons

- Button variants look good for `SecondaryButton` and `FlatButton`.
- Border color matches background color for `PrimaryButton`.
- Disabled text and icon color for `PrimaryButton` is the same as for `SecondaryButton`.

### Breaking changes

- Removed `Spinner` variant `large`.

## 9.0.0

### Breaking changes

- Removed `ActionDropdown` and `ActionDropdownTheme`
- Removed `theme` prop from `ActionMenuItem`, replacing it with a `variant` prop that can be set to `danger`
- `ActionMenuButton` is no longer exported. Instead, there are three new components:
  - `ActionMenuPrimaryButton`
  - `ActionMenuSecondaryButton`
  - `ActionMenuFlatButton`

### Design changes

- The icon for `SecondaryButton` is now blue.
- New variant `outlined` added to `Popover`. It is used for the Action menu, Checkbox menu, and Table head popover.
- Padding changes for `ActionMenu`, `ActionMenuItem`, `ActionMenuSeparator`.
- Expanded rows in `StandardTable` have a blue background with a border on the left.

### Bug fixes

- Fixed bug in `Popover` where arrow could not be removed.
- The top checkbox in `StandardTable` deselects all if some are selected, as opposed to selecting all.

## Additions

- Add `htmlFor` prop to `Label` component.

## 8.1.0

### Font changes

- Default primary font is now Stena Sans, with Open Sans fallback.

### Design changes

- Increased contrast in `Label`, `ValueTable` and input placeholders.
- Buttons now have a `width` prop which is responsive according to styled-system.

## Fixes

Remove letter-spacing override done by setting text size.

### Internal

- `Space` now uses emotion for styling instead of inline styles.

## 8.0.2

### DateTimeInput

Types now allow value=null.
This makes sure that the component is control, while it has no value.

## 8.0.1

### DateTimeInput

Add `onBlur` prop. Triggered when the whole component loses focus.
Add `autoFocus` props. Autofocuses on date part of the input.

### DateRangeDualTextInput

Add `autoFocus` props. Autofocuses on date part of the input.

### Link

Add variant `bold`.

## 8.0.0

### Box

The following props on `Box` are now responsive:

- `row`
- `indent`
- `spacing`
- `background`
- `border`
- `borderColor`
- `display`
- `shadow`

They can be used by passing an array or dictionary with values instead of a single value.

### ToggleButton

Design has been updated to use design system colors.

### Themes

Theming is no longer using React context.
All theme variables are using CSS properties.

### Breaking changes

`Box` no longer has property `color`.
This also applies to components derived from `Box`,
such as `Row` and `Column`.

## 7.5.2

# DateTimeInput

- Fixed width of time input in DateTimeInput.
- `onEsc` and `onEnter` are no longer required props.

## 7.5.1

# DateTimeInput

Add props `onEsc` and `onEnter`. They are invoked on both input fields.

# TimePicker

Fix missing key in JSX.

## 7.5.0

### New component `DateTimeInput`

An input field with both date and time.
When entering date, a popover with a calendar is showing.
When entering time, a popover with time picker is showing.

### New component `TimePicker`

A component for selecting hour and minute.

### New util functions in `core`

- `parseFloatElseUndefined`
- `parseIntElseUndefined`

They return undefined if parse fails.

### Updated `Select`

- Select component now allows menu component to be wider than the input.

### Breaking changes

- Select options now has `whiteSpace` set to `nowrap`.

## 7.4.0

### grid-export

- Add support for copy table content with default formatting (as well as other components) to clipboard.

### DateRangeDualTextInput

Updated behaviour when selecting dates in popover.

- Selecting startDate always moves to endDate.
- Selecting endDate closes calendar except when
  date range is invalid or startDate has not been selected.
  Then it moves to start date.

### New hook `useDelayedFalse`

A hook that takes a boolean as argument and returns that boolean.
When boolean turns false, it returns false after a certain delay.
When boolean turns true, it returns true immediately.

This is useful for delaying the removal of elements in the DOM.

## 7.3.0

### New component `ValueTable`

- Table for displaying key/value pairs of data.
- Available in `elements` package.

## 7.2.1

- Small alignment fix in `StandardTable` header.

## 7.2.0

## Bread crumbs

- Added bread crumbs. Use `Crumb` components and wrap them with `BreadCrumbs`.
- Story example shows how to integrate with react-router.

## 7.1.0

### grid-export

- Null and undefined in cells are now rendered as empty strings.
- Add support for booleans, will render "Y" when true and "" when false.

#### Fixes

- When `itemLabelFormatter` returned falsy value, Excel cell would instead contain the non-formatted value.

## 7.0.0

### StandardTable

- Added `onKeyDown` prop. Callback receives event and object with columnId and item of focused cell.
- Border is no longer rendered on left-most column.
- If a cell is in focus, that row is highlighted.

#### Column groups

- Add support for column groups.
- If `columnGroups` is set in table config, `columnOrder` is ignored.
- If `columnGroups` is set, `columnGroupOrder` must be set.

### grid-export

- grid-export package now fully supports column groups.

### Breaking changes

- `Heading` no longer has margin, layout should be decided by parents.

## 6.1.0

### New package `grid-export`

Contains components and logic for exporting data in tables to file.

#### StandardTableExcelExportButton

When the user clicks the button, it downloads the
content of a `StandardTable` as an Excel .xlsx file.

### Fixes

- Fixed `TextInput` height in Safari.

## 6.0.1

- Hotfix for prop type definitions for Indent and Spacing.

## 6.0.0

### Removed components

The following components have been removed:

- Absolute
- Relative

### Ref changes

The following components now use `ref` prop instead of `innerRef`:

- Clickable
- Box
- Row
- Spacing
- Indent
- Column
- Link
- ResizeAwareBox
- Checkbox
- RadioButton
- Heading
- All text components

`RadioButtonWithLabel` and `CheckboxWithLabel` now has `wrapperRef`
and `inputRef` props.

`SeparatorLine` now has `ref` prop.

### Fixes

- `RadioButtonWithLabel` prop `textColor` now actually changes the color of the label.
- `StandardTable` uses white as default background color which fixes sticky columns being transparent.

### Calendars

- `YearPicker` now allows navigation more than 10 years from current year.
- `YearPicker` now longer shows too many years when year value (below 11) is passed as `value`.
- Single date calendars now sets initial focused month based on current `value`.

### TextInput

- `TextInput` was not triggering `onDone` if not `onEnter` was set.
- `TextInput` no longer forces blur when user pressed enter.
- `TextInput` prop `selectAllOnFocus` has been removed, default browser behaviour is used instead.

## 5.3.2

### StandardTable

- Default background color is now white, instead of transparent.
- When a row or cell has custom background color, no hover color is applied.

## 5.3.1

- Export `PasswordInput` component in forms package.

## 5.3.0

### Label

- `Label` now wrapped in actual `label` HTML element.
- `Label` with `row` prop now aligns text properly.
- `Label` now has `textWidth` prop.

### PasswordInput

- New component `PasswordInput` with a show password button.

### Breaking changes

- `Clickable` now has `type=button` as default to prevent it from submitting forms when clicked.

## 5.2.0

### Icons

- Add stories for custom icons.

### NavBar

- Adjusted some alignments between side menu button, left content and buttons.
- Centered content is now always centered.
- New component `NavBarSearchField` which is a custom style input field.
- New component `NavBarHeading` which is a heading text for nav bar.

## 5.0.0

### FlatButton

- `FlatButton` now has own CSS properties for settings colors. This makes it easier to override colors for `FlatButton`.

### NavBar

- New prop `variant` with two options `standard` and `dark`.
- New prop `left` for placing content on the left side.
- New prop `showMenuButton` shows a button with a hamburger icon on the left edge of the menu.
- New prop `onClickMenuButton` callback when user clicks on the button.
- Height increased to 64px.

### SidebarMenu

- Top of menu is now 64px, to align with `NavBar` properly.
- Close button updated to have same dimensions as in `NavBar`.

### StandardTable

- `StandardTable` has new prop `variant` which controls how compact the table is.
- Overflow on labels now show `...` instead of just cutting off text.
- Header now looks more like design system.
- Sticky z-indices are now optional, and only needed for custom behaviour.
- Sticky column and sticky header can be combined together.
- Improve look of shadows when using sticky in table.
- Info tooltip in table header is no longer transparent.

### Breaking changes

#### Popover

- `TableHeadItem` prop `popoverButtonLoading` renamed to `loading` and can be visible at the same time as popover
  button.

#### StandardTable

- Config field `headerRowSticky` renamed to `stickyHeader`.
- Config field `headerRowZIndex` renamed to `zIndex`.
- Config field `shadowBorder` has been removed.

#### NavBar

- `NavBarMenuButton` is replaced by `NavBarPopoverButton`.

## 4.1.0

### New components

- `ActionMenuLink`

Same as `ActionMenuItem`, but uses `FlatButtonLink` instead of `FlatButton`. This makes it possible to use `href`
and `target` props.

### New features

- `Link`

Add variants and sizes to `Link`, same as for `Text` except `bold` which is default for links.

### Breaking changes

- `TextVariants` type has been renamed to `TextVariant`.
- `Link` now produces an a tag, instead of span.

### Fixes

Set sideEffects true in `theme` package.json, to prevent webpack from tree-shaking the theme CSS.

## 4.0.2

### Fixes

- `Chip` was not using correct font.

## 4.0.1

### Fixes

- `Tag` was not using correct font.

## 4.0.0

### Fixes

- Line height was too small in `Text` styling.
- `Tag` and `Chip` had wrong font.
- `CheckboxWithLabel` props `textColor` not working.

### Breaking changes

- `Badge` prop `type` renamed to `variant`.
- `Badge` variant `notification` renamed to `info`.

## 3.0.0

### Design fixes

- Popover now uses box-shadow from `default-theme.css` instead of tippy.js default.

### New components

#### Tag

Derived from `Chip`, but with border and no interactions.

#### Text

A new component `Text` with different variants. The variation implements all the different typography in LHDS.

Main props are `variant` and `size`.

Variants have predefined styles including color, but color can be overridden with prop `color`.

See stories for examples.

#### Heading

Same as `Text`, but for headings.

Variants are `h1` through `h6`.

#### Other components

All components that use old text components have been updated to use new components.

#### Stories

All stories have been updated to use new components.

### Deprecations

The following components are still available, but are deprecated and will be removed in a future release.

- `HeaderText`
- `LargeText`
- `StandardText`
- `SmallText`
- `SmallerText`

`HeaderText` now uses `Heading`. The rest uses `Text`. This means that many props are no longer available.

### Breaking changes

#### HeaderText

`HeaderText` no longer supports `hoverUnderline`, `hoverColor`, `textDecoration` and `fontWeight`.

#### Text components

- No longer supports `hoverColor`, `textDecoration`, `hoverUnderline`, `fontWeight`.
- No longer supports `italic`, use `<Text variant={"caption"}>` instead.

#### TinyText

`TinyText` has been removed. Use `Text` with variant `smaller` instead.

#### Chip

`Chip` now only has two variants, `primary` and `secondary`.

## 2.3.1

### Improvements

#### `SidebarMenu`

- `SidebarMenuLink` now supports `leftIcon`, `rightIcon`, etc, same as buttons.
- `SidebarMenuLink` now has `indent` prop and can be used in `SidebarMenuCollapsible`.
- `StandardTable` configuration now has default `z-index` set to undefined instead of 1000.

### Breaking changes

- Removed `SidebarMenuCollapsibleLink`, just use `SidebarMenuLink` with `indent` prop.
- `StandardTable` option `headerRowZ` to renamed to `zIndex`.

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
