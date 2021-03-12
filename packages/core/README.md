# stenajs-webui/core

The core library for @stenajs-webui.

All other packages depend on core.

## View components

### Layout

Box is the main building stone which most other components are derived from.

- [Box](src/components/layout/box/Box.md)

#### Components derived from Box

* Column (same as Box, content is placed in a column)
* Row (same as Box, content is placed in a row)
* [Indent](src/components/layout/indent/Indent.md)
* [Space](src/components/layout/space/Space.md)
* [Spacing](src/components/layout/spacing/Spacing.md)

### Interaction

- [Clickable](src/components/interaction/Clickable.md)

### Decorators

- SeparatorLine

## Hooks

`core` includes a collection of hooks.
See [`src/hooks/README.md`](src/hooks/README.md) for details.
