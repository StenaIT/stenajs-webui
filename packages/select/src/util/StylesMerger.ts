import { merge } from "lodash";
import { StylesConfig } from "react-select/src/styles";

export const mergeStyles = (
  themeStyle: StylesConfig,
  userStyle?: StylesConfig
): StylesConfig => {
  if (!userStyle) {
    return themeStyle;
  }
  return merge({}, themeStyle, userStyle);
};
