# Box

Box uses flex, and exposes props for alignment, justify content, border, background, etc.

This is the base component for all layout.
All other layout components extend Box, and their main purpose is readability in JSX.

For example:

```jsx
<Box flexDirection={'row'}>
   some content
</Box>
```

is less readable than

```jsx
<Row>
   some content
</Row>
```

But sometimes you want many styling rules on the same element.

It probably makes more sense to use one Box instead of many nested components, to prevent DOM bloat.

```jsx
<Box
  flexDirection={"row"}
  spacing
  indent
  background={"#757575"}
  border={"1px solid #3a3a3a"}
>
  some content
</Box>
```
