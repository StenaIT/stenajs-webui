import { useMemo } from "react";
import { BoxProps } from "../../layout/box/Box";

interface UseDefaultClickableOptions {
  disableFocusHighlight?: boolean;
  opacityOnHover?: boolean;
}

export const useDefaultClickable = (
  options?: UseDefaultClickableOptions
): Partial<BoxProps> => {
  const { disableFocusHighlight = false, opacityOnHover = false } =
    options || {};
  return useMemo<Partial<BoxProps>>(
    () => ({
      display: "inline-block",
      background: "transparent",
      border: "0",
      userSelect: "none",
      spacing: 0,
      indent: 0,
      element: "button",
      cursor: "pointer",
      hoverOpacity: opacityOnHover ? 0.7 : 1,
      activeOpacity: 0.5,
      focusOutline: "0",
      focusBoxShadow: disableFocusHighlight
        ? undefined
        : "0 0 3pt 2pt rgba(0, 0, 100, 0.3);"
    }),
    [disableFocusHighlight, opacityOnHover]
  );
};
