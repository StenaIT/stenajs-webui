import { createContext, useContext } from "react";
import { ColumnIndexPerColumnIdCalculationResult } from "./ColumnIndexCalculator";

export const ColumnIndexPerColumnIdContext = createContext<
  ColumnIndexPerColumnIdCalculationResult<string>
>({
  columnIndexPerColumnId: {},
  numNavigableColumns: 0,
});

export const useColumnIndexPerColumnIdContext = <TColumnKey extends string>() =>
  useContext(
    ColumnIndexPerColumnIdContext,
  ) as ColumnIndexPerColumnIdCalculationResult<TColumnKey>;
