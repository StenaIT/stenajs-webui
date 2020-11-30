# Popover

`Popover` can add a popover to any component.

```
<Popover
  placement={"bottom"}
  content={<Text>Nice content on bottom</Text>}
>
  <Text>Hover me</Text>
</Popover>
```

Popover uses Tippy.js with little added functionality.
All props that are not consumed by Popover are sent down to Tippy.
