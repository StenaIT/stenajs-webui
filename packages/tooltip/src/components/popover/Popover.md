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

Popover uses Tippy.js with little added functionality.
All props that are not consumed by Popover are sent down to Tippy.
