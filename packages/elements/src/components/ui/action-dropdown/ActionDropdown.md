# ActionDropdown

This component is a dropdown with buttons, as opposed to `select`
which lets the user select one of several options.

This can be used for menus with actions, or menus with checkboxes, etc.

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
| width    | The width of the dropdown. | Yes      | 180px          |
| label    | The label shown.           | Yes      | "Actions"      |
| disabled | Disables the dropdown      | Yes      | false          |
| theme    | The theme to use           | Yes      | Default theme  |

## Children components

Several components are available to create the content of the dropdown.

### ActionDropdownItem

This creates a clickable item in the menu.

The menu closes automatically when clicking on an item.

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
When omitted, it falls back to the theme used by the parent `ActionDropdown` component.

### ActionDropdownSeparator

This creates a separator in the menu.

It has no props.
