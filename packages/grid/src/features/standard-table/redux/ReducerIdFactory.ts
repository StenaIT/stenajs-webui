type ReducerIdSuffix = "selectedIds" | "expandedRows" | "sortOrder" | "fields";

export const getReducerIdFor = (
  reducerId: string,
  reducerIdSuffix: ReducerIdSuffix,
): string => `${reducerId}.${reducerIdSuffix}`;
