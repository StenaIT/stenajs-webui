import { ThemeProvider } from "@stenajs-webui/core";
import * as React from "react";
import { externalTheme, internalTheme } from "@stenajs-webui/core";

export const parameters = {
  a11y: {
    element: "#root",
    config: {},
    options: {},
    manual: true,
  },
  controls: { expanded: true },
};

export const globalTypes = {
  theme: {
    name: "Themes",
    description: "Global theme for components",
    defaultValue: "external",
    toolbar: {
      icon: "paintbrush",
      items: [
        {
          title: "Internal theme",
          value: "internal" /* : your dark theme */,
        },
        {
          title: "External Theme",
          value: "external" /* : your light theme */,
        },
      ],
    },
  },
};

const withThemeProvider = (Story, context) => {
  const theme =
    context.globals.theme === "internal" ? internalTheme : externalTheme;
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];
