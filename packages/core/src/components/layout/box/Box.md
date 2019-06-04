# Box

Box uses flex, and exposes props for alignment, justify content, border, background, etc.

This is the base component for all layout.
All other layout components extend Box, and their main purpose is readability in JSX.

For example:

```jsx
<Box flexDirection={'row'}>
   some content
</Row>
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

# Theming

You can set border, background, spacing, indent, etc, using theme.

It allows presets from theme.

```jsx
<Box background={'primaryBg'}>
    some content
</Box>
```

As well as raw CSS values.

```jsx
<Box background={'#757575'}>
    some content
</Box>
```

The following props can use theme palette names:

- boxShadow
- background
- border
- borderColor
