import { ThemeColors } from "./theme-types/ThemeColors";
import { ThemeFonts } from "./theme-types/ThemeFonts";
import { ThemeFontSizes } from "./theme-types/ThemeFontSizes";
import { ThemeFontWeights } from "./theme-types/ThemeFontWeights";
import { ThemeMetrics } from "./theme-types/ThemeMetrics";
import { ThemeShadows } from "./theme-types/ThemeShadows";

export interface Theme {
  colors: ThemeColors;
  metrics: ThemeMetrics;
  fonts: ThemeFonts;
  fontSizes: ThemeFontSizes;
  fontWeights: ThemeFontWeights;
  shadows: ThemeShadows;
}

export interface PartialTheme {
  colors?: Partial<ThemeColors>;
  metrics?: Partial<ThemeMetrics>;
  fonts?: Partial<ThemeFonts>;
  fontSizes?: Partial<ThemeFontSizes>;
  fontWeights?: Partial<ThemeFontWeights>;
  shadows?: Partial<ThemeShadows>;
}
