import { merge } from "lodash";
import { StylesConfig } from "react-select";
import { OptionTypeBase } from "react-select/src/types";

export const mergeStyles = <
  OptionType extends OptionTypeBase,
  IsMulti extends boolean
>(
  themeStyle: StylesConfig<OptionType, IsMulti>,
  userStyle?: StylesConfig<OptionType, IsMulti>
): StylesConfig<OptionType, IsMulti> => {
  if (!userStyle) {
    return themeStyle;
  }
  return merge({}, themeStyle, userStyle);
};
