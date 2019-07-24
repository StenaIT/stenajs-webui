import { PartialTheme, Theme } from "./Theme";
import { merge } from "lodash";

export const mergeTheme = (theme: Theme, partialTheme: PartialTheme): Theme =>
  merge({}, theme, partialTheme);
