import { keys } from "lodash";

export const getDataProps = <T extends Record<string, unknown>>(
  props: Record<string, unknown> | {}
): T =>
  keys(props)
    .filter(isDataProp)
    .reduce<T>((sum, key) => {
      (sum as any)[key] = props[key];
      return sum;
    }, {} as T);

const isDataProp = <TProp extends string>(propName: TProp): boolean =>
  propName.startsWith("data-") || propName.startsWith("aria-");
