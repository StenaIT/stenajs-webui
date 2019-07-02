import { UseGridCellOptions } from "../hooks/UseGridCell";
import { ValidatedUseGridNavigationOptions } from "../hooks/UseGridNavigation";

export const validateGridHookOptions = <TValue>(
  options: UseGridCellOptions<TValue>
): ValidatedUseGridNavigationOptions => {
  if (!options.tableId) {
    throw new Error("tableId is required.");
  }
  if (options.numRows == null) {
    throw new Error("numRows is required.");
  }
  if (options.numCols == null) {
    throw new Error("numCols is required.");
  }

  return options as ValidatedUseGridNavigationOptions;
};
