# ActionMenu

This is a menu made for actions, such as the `File` menu in a
typical application.

`ActionMenu` is just the menu itself and can be used as is.
Display it in a page, display it when the user right clicks,
or any other way.

The user can tab between items.

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

| Name   | Description                                      | Optional | Default value |
| ------ | ------------------------------------------------ | -------- | ------------- |
| shadow | Shadow to use around the menu. Used by dropdown. | Yes      | No shadow     |
| top    | Content to show above items. Used by dropdown.   | Yes      | No content.   |
| width  | The width of the dropdown.                       | Yes      | 180px         |

## Children components

Several components are available to create the content of the dropdown.

### ActionMenuItem

This creates a clickable item in the menu.

#### Props

| Name                | Description                                             | Optional | Default value            |
| ------------------- | ------------------------------------------------------- | -------- | ------------------------ |
| label               | The label of the item                                   | Yes      | No label                 |
| rightText           | Text to the right                                       | Yes      | No text                  |
| icon                | Icon to show on the left                                | Yes      | No icon                  |
| iconRight           | Icon to show on the right                               | Yes      | No icon                  |
| disabled            | Disables the item                                       | Yes      | Enabled                  |
| disableCloseOnClick | If true, the menu doesn't close when clicking this item | Yes      | Closes menu on click     |
| onClick             | Callback called when user clicks                        | Yes      | Nothing happens on click |
| variant             | Which variant to use                                    | Yes      | "standard"               |

### ActionMenuSeparator

This creates a separator in the menu.

It has no props.
