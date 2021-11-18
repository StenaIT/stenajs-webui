import { merge } from "lodash";
import { StylesConfig } from "react-select";

export const mergeStyles = <OptionType, IsMulti extends boolean>(
  themeStyle: StylesConfig<OptionType, IsMulti>,
  userStyle?: StylesConfig<OptionType, IsMulti>
): StylesConfig<OptionType, IsMulti> => {
  if (!userStyle) {
    return themeStyle;
  }
  return merge({}, themeStyle, userStyle);
};
