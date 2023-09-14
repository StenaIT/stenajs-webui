import { LhdsColor } from "../types/LhdsColor";
import { ThemeColor } from "../types/ThemeColor";
import { BrandColor } from "../types/BrandColor";

export type CssPropColor = LhdsColor | ThemeColor | BrandColor;

export const cssColor = (cssPropColor: CssPropColor) => `var(${cssPropColor})`;
