import * as React from "react";
import { ReactNode, useMemo } from "react";

interface GridHooksTableProps extends GridHooksContextValue {
  children?: ReactNode;
}

interface GridHooksContextValue {
  /**
   * Total number of rows in table. Must be set in cell hook or in GridHooksTable prop.
   */
  numRows?: number;
  /**
   * Total number of columns in table. Must be set in cell hook or in GridHooksTable prop.
   */
  numCols?: number;
  /**
   * An ID for the table, must be unique for every table in page. Must be set in cell hook or in GridHooksTable prop.
   */
  tableId?: string;
  /**
   * If true, navigation will wrap around the table. If false, navigation stops at table edge.
   */
  wrap?: boolean;
}

export const GridHooksContext = React.createContext<GridHooksContextValue>({});

export const GridHooksTable: React.FC<GridHooksTableProps> = ({
  children,
  numCols,
  numRows,
  tableId,
  wrap,
}) => {
  const contextProps = useMemo<GridHooksContextValue>(
    () => ({ numCols, numRows, tableId, wrap }),
    [numCols, numRows, tableId, wrap]
  );

  return (
    <GridHooksContext.Provider value={contextProps}>
      {children}
    </GridHooksContext.Provider>
  );
};
