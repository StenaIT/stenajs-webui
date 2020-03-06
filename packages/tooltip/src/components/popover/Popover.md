# Popover

`Popover` can add a popover to any component.

```
<Popover
  placement={"bottom"}
  content={<StandardText>Nice content on bottom</StandardText>}
>
  <StandardText>Hover me</StandardText>
</Popover>
```

This uses popper.js to position the popover.

## `placement` prop

Specifies which side of `children` the popover should be positioned.
This is optional. Can be `"bottom"`, `"top"`, `"left"` or `"right"`.

## `trigger` prop

`trigger` can be set to `"hover"` or `"click"`.

### Hover trigger

When `hover`, the popover is displayed when mouse hovers over `children`.
When the mouse no longer hovers, the popover is hidden again.

### Click trigger

When `click`, the popover is displayed when the user clicks on `children`.

If `children` is a React node, it is automatically wrapped in `Clickable`.

If you are using a component that has it's own click listener (`StandardButton` for example),
you can use functional children to programmatically show the popover.

See `render props` section below.

Whenever using `click` trigger, `Popover` will hide the popover when clicking
outside of it.

## Render props

Both `content` and `children` props accept render functions.

These functions receive one argument, an object `{ hide, show }`.

You can use `hide` and `show` to programmatically show or hide the popover.

```
<Popover
  content={<StandardText>Nice content on bottom</StandardText>}
  trigger={"click"}
>
  {({ show }) => <PrimaryButton onClick={show}>Click me</PrimaryButton>}
</Popover>
```
