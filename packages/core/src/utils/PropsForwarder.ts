import { keys } from "lodash";

export function getDataProps<T extends Record<string, unknown>>(
  props: Record<string, unknown> | {}
): T {
  let propList = keys(props);
  return propList.filter(isDataProp).reduce<T>((sum, key) => {
    (sum as any)[key] = props[key];
    return sum;
  }, {} as T);
}

const isDataProp = <TProp extends string>(propName: TProp): boolean =>
  propName.indexOf("data-") === 0 || propName.indexOf("aria-") === 0;
