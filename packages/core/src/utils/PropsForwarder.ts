import { pickBy } from "lodash";

export const getDataProps = <T extends Record<string, unknown>>(
  props: Record<string, unknown> | {}
): T => pickBy(props, isDataPropMapper) as T;

const isDataPropMapper = (_: unknown, key: string): boolean => isDataProp(key);

const isDataProp = <TProp extends string>(propName: TProp): boolean =>
  propName.startsWith("data-") || propName.startsWith("aria-");
