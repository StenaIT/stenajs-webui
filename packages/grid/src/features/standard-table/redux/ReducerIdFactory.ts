type ReducerIdSuffix = "selectedIds" | "expandedRows" | "sortOrder";

export const getReducerIdFor = (
  reducerId: string,
  reducerIdSuffix: ReducerIdSuffix
): string => `${reducerId}.${reducerIdSuffix}`;
