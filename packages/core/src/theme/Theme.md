# Theming

`@stenajs-webui` supports theming.

This is done by providing a palette of colors, fonts, font sizes, etc.
All colors, etc, are named.

```
primaryBg: "#F9F7F4"
```

See the [default theme](DefaultTheme.ts) to see an example.

## Theme context

You can use your own custom theme by using the `ThemeProvider` component.

```
const yourTheme: Theme = {...};
```

In your application root:

```
    <ThemeProvider value={yourTheme}>
        <YourApplication />
    </ThemeProvider>
```

Your theme can be partially complete, and for any missing values, it will fall
back to the default theme.

### Nesting themes

You can nest themes, to make certain parts of the page use a different theme.

For example, your header might be a dark background with white text,
while the main content is white background with dark text.

```
const lightTheme: Theme = {...};
const darkTheme: Theme = {...};
```

```
  <ThemeProvider value={lightTheme}>
    <ThemeProvider value={darkTheme}>
      <Header />
    </ThemeProvider>
    <Content />
  </ThemeProvider>
```

In this example, darkTheme is used.
If colors are missing in darkTheme, those colors will come from lightTheme instead.
If they are missing in lightTheme as well, it will fall back to default theme.

## Hooks

### useTheme

You can get the current theme using `useTheme`.

```
const theme = useTheme();
```

### useThemeSelector

You can also resolve color names from the current theme.

```
const { colors } = useThemeSelector({
  colors: {
    primaryBg,
  }
});

/* 
  colors will
  {
    primaryBg: "#F9F7F4",
  }
*/ 
```
