# Changelog

#### Next release

* Add `ActionMenu` and `ActionDropdown` component to `elements`.
* Add `useElementFocus` hook to `core`.
* Add `useMouseIsEntered` hook to `core`.

#### 0.0.35

* Upgrade `date-fns` to `2.0.1`.
* Add `show` option to `WeekNumber` config used in `CalenderMonth`
* Add new highlight states to `DayStateHighlight`: `selectedStart` and `selectedEnd`. For compatibility reasons the selected days hove both the old `selected` AND `selectedStart` and/or `selectedEnd`
* Add `borderColor` (and `borderColorDisabled`) to `ButtonTheme`.

#### 0.0.34

* Add first version of `@stenajs-webui/redux`.
* Add `commit-reducer` feature for Redux.
* Add `Drawer`
* Add `useArraySet` hook.
* Update design of `Spinner`.
* Add `InputSpinner` which is used in buttons and input fields.
* Merge the two individual theme prop for calendar and text input into one common theme prop for `DateTextInput`.
* Add `fontWeight` to `ButtonTheme`.
* Remove letter spacing in buttons.

#### 0.0.33

* Add first version of `@stenajs-webui/tooltip`.
* Add `WithTooltip` component.
* Add `MultiDateCalendar` component. User can select range as well as toggle individual dates.
* Add standardized sizes to `Progress`, `small`, `normal`, `large`.
* Add `invalid` prop to `StandardTextInput` with updated theme.
* `Progress` `size` prop now sets height (previously only set width).
* `recompose` is no longer a dependency on any of the packages.
* `calendar` package has been refactored and no longer depends on `recompose`.
* Clickable forwards DOM attribute props, such as id and className.
* Build process includes imports checker, that checks that imported modules are specified as dependency in package.json.
* Add `useDomId` hook to `core`. Generates a unique id, that is guaranteed to persist through component lifecycle.
* Fix eslint in build process.

#### 0.0.32

* Add first version of `@stenajs-webui/input-mask`.
* Add `MaskedStandardTextInput` component, and `useMaskedInput` hook.
* `Box` is now responsive. `width` and `height` props can take array of values.
    * See https://styled-system.com/responsive-styles for more info.
* `padding` CSS rule is no longer set on `Box` div element, when spacing and indent are not set.
* Add stories for responsive `Box`.
* Add story for aria label on `Box`.

#### 0.0.31

* Add first version of `@stenajs-webui/modal`
* `ThemeProvider` now merges the provided theme with the theme from parent context
* Add missing dependency for `useCallback` in `Checkbox` causing `onValueChange` to become outdated

#### 0.0.30

* Set `box-sizing: border-box` on `Box`
* Fix centering for `Icon`
    * This also centers `Checkbox` icon

#### 0.0.29

* Fix hard dependency on `fontawesome-common-types`
* Fix warning for babel emotion plugin

#### 0.0.28

* Fix a bug in `Checkbox` that caused `onChange`/`onValueChange` to be called twice

#### 0.0.27

* Replace `lodash-es` with `lodash`

#### 0.0.26

* Allow `.` and `/` in `DateTextInput`
* Add support for `indeterminate` to `Checkbox`.
* Add ability to hide left side icon in `DateTextInput`.

#### 0.0.25

* Add `HeaderText` component.
* Add `LoadingScreen` and `LoadingPanel` components.
* Add `ErrorScreen` and `ErrorPanel` components.
* Add `Notification` component.
* Fix styling of grid in grid examples.

#### 0.0.24

* Add `NavBar`, `NavBarButton` and `NavBarMenuButton`.
* Add prop `textColor` to `Button`.
* Add `ToggleButton` component.
* Add `Badge` and `WithBadge` components.
* Add `textAlign` prop to all Text components.
