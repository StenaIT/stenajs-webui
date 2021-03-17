# Fonts guide

To use Stena Sans, first [download the font from the brandportal](https://brandportal.stenaline.com). (Choose to sign in via SSO)

The zip contains `WOFF` and `WOFF2` folders, copy and paste the font files from these folders into the `public/fonts` folder in your app (create it if it doesn't exist).

```
public
├── favicon.ico
└── fonts
    ├── StenaSans-Bold.woff
    ├── StenaSans-Bold.woff2
    ├── StenaSans-BoldCondensed.woff
    ├── StenaSans-BoldCondensed.woff2
    ├── StenaSans-BoldItalic.woff
    ├── StenaSans-BoldItalic.woff2
    ├── StenaSans-Light.woff
    ├── StenaSans-Light.woff2
    ├── StenaSans-LightItalic.woff
    ├── StenaSans-LightItalic.woff2
    ├── StenaSans-Medium.woff
    ├── StenaSans-Medium.woff2
    ├── StenaSans-MediumItalic.woff
    ├── StenaSans-MediumItalic.woff2
    ├── StenaSans-Regular.woff
    ├── StenaSans-Regular.woff2
    ├── StenaSans-RegularItalic.woff
    └── StenaSans-RegularItalic.woff2
```

Copy this style tag into the `<head>` tag in your `public/index.html` to define the font in your app:

```html
<style type="text/css">
  @font-face {
    font-family: "Stena Sans";
    src: local("StenaSans-Light"),
      url("/fonts/StenaSans-Light.woff2") format("woff2"), url("/fonts/StenaSans-Light.woff")
        format("woff");
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: "Stena Sans";
    src: local("StenaSans-Regular"),
      url("/fonts/StenaSans-Regular.woff2") format("woff2"), url("/fonts/StenaSans-Regular.woff")
        format("woff");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "Stena Sans";
    src: local("StenaSans-Medium"),
      url("/fonts/StenaSans-Medium.woff2") format("woff2"), url("/fonts/StenaSans-Medium.woff")
        format("woff");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: "Stena Sans";
    src: local("StenaSans-Bold"),
      url("/fonts/StenaSans-Bold.woff2") format("woff2"), url("/fonts/StenaSans-Bold.woff")
        format("woff");
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: "Stena Sans";
    src: local("StenaSans-LightItalic"),
      url("/fonts/StenaSans-LightItalic.woff2") format("woff2"), url("/fonts/StenaSans-LightItalic.woff")
        format("woff");
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: "Stena Sans";
    src: local("StenaSans-RegularItalic"),
      url("/fonts/StenaSans-RegularItalic.woff2") format("woff2"), url("/fonts/StenaSans-RegularItalic.woff")
        format("woff");
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: "Stena Sans";
    src: local("StenaSans-MediumItalic"),
      url("/fonts/StenaSans-MediumItalic.woff2") format("woff2"), url("/fonts/StenaSans-MediumItalic.woff")
        format("woff");
    font-weight: 500;
    font-style: italic;
  }
  @font-face {
    font-family: "Stena Sans";
    src: local("StenaSans-BoldItalic"),
      url("/fonts/StenaSans-BoldItalic.woff2") format("woff2"), url("/fonts/StenaSans-BoldItalic.woff")
        format("woff");
    font-weight: 700;
    font-style: italic;
  }
</style>
```
