import { ThemeColorField } from '@stenajs-webui/core';

export interface DateRangeInputTheme {
  borderColor: ThemeColorField;
  backgroundColor: ThemeColorField;
  highlightBorderColor: ThemeColorField;
}

export const defaultDateRangeInputTheme: DateRangeInputTheme = {
  backgroundColor: "white",
  borderColor: "separator",
  highlightBorderColor: "separatorHighlighted"
};
