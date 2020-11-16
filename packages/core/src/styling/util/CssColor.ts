import { LhdsColor } from "../types/LhdsColor";
import { ThemeColor } from "../types/ThemeColor";

export type CssPropColor = LhdsColor | ThemeColor;

export const cssColor = (cssPropColor: CssPropColor) => `var(${cssPropColor})`;
