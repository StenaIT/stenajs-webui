# Box

Box uses flex, and exposes props for alignment, justify content, border, background, etc.

This is the base component for all layout.
All other layout components extend Box, and their main purpose is readability in JSX.

For example:

```
<Box flexDirection={'row'}>
   ...
</Row>
```

is less readable than

```
<Row>
   ...
</Row>
```

But sometimes you want many styling rules on the same element. 

It probably makes more sense to use one Box instead of many nested components, to prevent DOM bloat.

```
<Box flexDirection={'row'}
     spacing
     indent
     background={'#757575'}
     border={'1px solid #3a3a3a'}>
    ...
</Box>
```

# Theming

You can set border, background, spacing, indent, etc, using theme.

It allows presets from theme.

```
<Box background={'primaryBg'}>
    ...
</Box>
```

As well as raw CSS values.

```
<Box background={'#757575'}>
    ...
</Box>
```

The following props can use theme palette names:

- boxShadow
- background
- border
- borderColor
