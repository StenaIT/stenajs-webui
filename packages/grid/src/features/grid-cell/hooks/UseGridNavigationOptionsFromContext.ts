import { useContext, useMemo } from "react";
import { GridHooksContext } from "../../../components/GridHooksTable";
import { validateGridHookOptions } from "../../../util/GridHookOptionsValidator";
import type {
  UseGridNavigationOptions,
  ValidatedUseGridNavigationOptions,
} from "./UseGridNavigation";

export const useGridNavigationOptionsFromContext = (
  options: UseGridNavigationOptions
): ValidatedUseGridNavigationOptions => {
  const context = useContext(GridHooksContext);

  return useMemo(
    () =>
      validateGridHookOptions({
        ...context,
        ...options,
      }),
    [context, options]
  );
};
