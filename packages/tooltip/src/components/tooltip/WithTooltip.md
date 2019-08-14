# WithTooltip

`WithTooltip` can add a tooltip to any component.

```
<WithTooltip
  placement={"bottom"}
  content={<StandardText>Nice content on bottom</StandardText>}
>
  <StandardText>Hover me</StandardText>
</WithTooltip>
```

This uses popper.js to position the tooltip.

## `placement` prop

Specifies which side of `children` the tooltip should be positioned.
This is optional. Can be `"bottom"`, `"top"`, `"left"` or `"right"`.

## `trigger` prop

`trigger` can be set to `"hover"` or `"click"`.

### Hover trigger

When `hover`, the tooltip is displayed when mouse hovers over `children`.
When the mouse no longer hovers, the tooltip is hidden again.

### Click trigger

When `click`, the tooltip is displayed when the user clicks on `children`.

If `children` is a React node, it is automatically wrapped in `Clickable`.

If you are using a component that has it's own click listener (`StandardButton` for example),
you can use functional children to programmatically show the tooltip.

See `render props` section below.

Whenever using `click` trigger, `WithTooltip` will hide the tooltip when clicking
outside of it.

## Render props

Both `content` and `children` props accept render functions.

These functions receive one argument, an object `{ hide, show }`.

You can use `hide` and `show` to programmatically show or hide the tooltip.

```
<WithTooltip
  content={<StandardText>Nice content on bottom</StandardText>}
  trigger={"click"}
>
  {({ show }) => <StandardButton onClick={show}>Click me</StandardButton>}
</WithTooltip>
```
