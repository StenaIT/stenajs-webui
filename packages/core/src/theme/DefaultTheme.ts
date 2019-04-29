import { defaultColors } from './default-values/DefaultColors';
import { defaultFonts } from './default-values/DefaultFonts';
import { defaultFontSizes } from './default-values/DefaultFontSizes';
import { defaultFontWeights } from './default-values/DefaultFontWeights';
import { defaultMetrics } from './default-values/DefaultMetrics';
import { Theme } from './Theme';

export const defaultTheme: Theme = {
  colors: defaultColors,
  metrics: defaultMetrics,
  fontWeights: defaultFontWeights,
  fonts: defaultFonts,
  fontSizes: defaultFontSizes,
  components: {},
};
