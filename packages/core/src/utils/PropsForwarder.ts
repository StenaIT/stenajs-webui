import { pickBy } from "lodash-es";

export const getDataProps = <T extends Record<string, unknown>>(
  props: Record<string, unknown> | object,
): T => pickBy(props, isDataPropMapper) as T;

const isDataPropMapper = (_: unknown, key: string): boolean => isDataProp(key);

const isDataProp = <TProp extends string>(propName: TProp): boolean =>
  propName.startsWith("data-") || propName.startsWith("aria-");
