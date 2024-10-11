import * as React from "react";
import { StandardTableOnKeyDownArgs } from "../config/StandardTableConfig";

export type StandardTableOnKeyDown<TItem, TColumnKey extends string> = (
  ev: React.KeyboardEvent<HTMLDivElement>,
  args: StandardTableOnKeyDownArgs<TItem, TColumnKey>,
) => void;

export type StandardTableOnSortOrderChange<TColumnKey extends string> = (
  sortOrder: TColumnKey,
  desc: boolean,
) => void;
