import { ReactNode } from "react";

export interface StandardTableColumnGroupConfig<TColumnKey extends string> {
  label?: string;
  render?: (config: StandardTableColumnGroupConfig<TColumnKey>) => ReactNode;
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  columnOrder: Array<TColumnKey>;
  borderLeft?: boolean | string;
  loading?: boolean;
}
