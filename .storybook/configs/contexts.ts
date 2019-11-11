import {
  externalTheme,
  internalTheme,
  ThemeProvider
} from "@stenajs-webui/core";

export const contexts = [
  {
    icon: "paintbrush", // a icon displayed in the Storybook toolbar to control contextual props
    title: "Themes", // an unique name of a contextual environment
    components: [
      // an array of components that is going to be injected to wrap stories
      /* Styled-components ThemeProvider, */
      /* Material-ui ThemeProvider, */
      ThemeProvider
    ],
    params: [
      // an array of params contains a set of predefined `props` for `components`
      {
        name: "Internal theme",
        props: { value: internalTheme /* : your dark theme */ }
      },
      {
        name: "External Theme",
        props: { value: externalTheme /* : your light theme */ },
        default: true
      }
    ],
    options: {
      deep: false, // pass the `props` deeply into all wrapping components
      disable: false, // disable this contextual environment completely
      cancelable: false // allow this contextual environment to be opt-out optionally in toolbar
    }
  }
];
