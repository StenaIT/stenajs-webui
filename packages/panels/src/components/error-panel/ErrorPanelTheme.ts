import { ThemeColorField } from "@stenajs-webui/core";

export interface ErrorPanelTheme {
  width: string;
  height: string;
  backgroundColor: ThemeColorField | string;
}

export const defaultErrorPanelTheme: ErrorPanelTheme = {
  width: "350px",
  height: "250px",
  backgroundColor: "disabledBackground",
};
