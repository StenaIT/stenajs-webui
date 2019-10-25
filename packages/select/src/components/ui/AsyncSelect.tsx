import { Omit } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import { Async as AsyncComponent } from "react-select";
import { Props } from "react-select/lib/Async";
import { useSelectTheme } from "../../hooks/useSelectTheme";
import { defaultSelectTheme, SelectTheme } from "../../SelectTheme";
import { createStylesFromTheme } from "../../util/StylesBuilder";
import { mergeStyles } from "../../util/StylesMerger";

interface AsyncSelectProps<T> extends Omit<Props<T>, "theme"> {
  theme?: SelectTheme;
}

export const AsyncSelect = <T extends {}>({
  theme = defaultSelectTheme,
  styles,
  ...selectProps
}: AsyncSelectProps<T>) => {
  const { colors } = useSelectTheme(theme);

  const selectStyles = useMemo(
    () => mergeStyles(createStylesFromTheme(theme, colors), styles),
    [theme, colors, styles]
  );

  return <AsyncComponent styles={selectStyles} {...selectProps as Props<T>} />;
};
