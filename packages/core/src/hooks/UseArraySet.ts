import { useCallback } from "react";

export const useArraySet = <T>(
  list: Array<T>,
  setList: (list: Array<T>) => void
) => {
  const add = useCallback(
    (item: T) => {
      if (list.indexOf(item) < 0) {
        setList([...list, item]);
      }
    },
    [list, setList]
  );

  const remove = useCallback(
    (item: T) => {
      const index = list.indexOf(item);
      if (index >= 0) {
        setList(list.filter((_, i) => i !== index));
      }
    },
    [list, setList]
  );

  const toggle = useCallback(
    (item: T) => {
      const index = list.indexOf(item);
      if (index >= 0) {
        remove(item);
      } else {
        add(item);
      }
    },
    [list, add, remove]
  );

  return {
    add,
    remove,
    toggle
  };
};
