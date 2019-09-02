# ActionMenu

This is a menu made for actions, such as the `File` menu in a
typical application.

There are two main components, `ActionMenu` and `ActionDropdown`.

`ActionMenu` is just the menu itself and can be used as is.
Display it in a page, display it when the user right clicks,
or any other way.

The user can tab between items.

`ActionDropdown` is the `ActionMenu` wrapped in a dropdown element.
The menu will be displayed when the dropdown is clicked, and the
dropdown will automatically close when an item in the menu is clicked.

When dropdown is in focus, the user can press enter to open it.
When the dropdown is open, the user can press esc to close it.

## ActionMenu

#### Example

```js
<ActionMenu>
  <ActionDropdownItem label={"Open"} onClick={onOpen} />
  <ActionDropdownItem label={"Save"} icon={faSave} onClick={onSave} />
  <ActionDropdownSeparator />
  <ActionDropdownItem label={"Quit"} rightText={"cmd+q"} onClick={onQuit} />
</ActionMenu>
```

#### Props

| Name   | Description                                      | Optional |  Default value |
| ------ | ------------------------------------------------ | -------- | -------------- |
| shadow | Shadow to use around the menu. Used by dropdown. | Yes      | No shadow      |
| theme  | The theme to use                                 | Yes      | Default theme  |
| top    | Content to show above items. Used by dropdown.   | Yes      | No content.    |
| width  | The width of the dropdown.                       | Yes      | 180px          |

## ActionDropdown

#### Example

```js
<ActionDropdown>
  <ActionDropdownItem label={"Open"} onClick={onOpen} />
  <ActionDropdownItem label={"Save"} icon={faSave} onClick={onSave} />
  <ActionDropdownSeparator />
  <ActionDropdownItem label={"Quit"} rightText={"cmd+q"} onClick={onQuit} />
</ActionDropdown>
```

#### Props

| Name     | Description                | Optional |  Default value |
| -------- | -------------------------- | -------- | -------------- |
| disabled | Disables the dropdown      | Yes      | false          |
| label    | The label shown.           | Yes      | "Actions"      |
| theme    | The theme to use           | Yes      | Default theme  |
| width    | The width of the dropdown. | Yes      | 180px          |

## Children components

Several components are available to create the content of the dropdown.

### ActionMenuItem

This creates a clickable item in the menu.

When using `ActionDropdown`, the menu closes automatically when clicking on an item.

#### Props

| Name                | Description                                             | Optional | Default value             |
| ------------------- | ------------------------------------------------------- | -------- | ------------------------- |
| label               | The label of the item                                   |  Yes     |  No label                 |
| rightText           | Text to the right                                       | Yes      | No text                   |
| icon                | Icon to show on the left                                | Yes      | No icon                   |
| iconRight           | Icon to show on the right                               | Yes      | No icon                   |
| disabled            | Disables the item                                       | Yes      |  Enabled                  |
| disableCloseOnClick | If true, the menu doesn't close when clicking this item | Yes      |  Closes menu on click     |
| onClick             | Callback called when user clicks                        | Yes      |  Nothing happens on click |

#### Theme

It takes an optional theme prop.

This prop is usually not needed.
When omitted, it falls back to the theme used by the parent `ActionMenu` or `ActionDropdown` component.

### ActionMenuSeparator

This creates a separator in the menu.

It has no props.
