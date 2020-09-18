import { useCallback } from "react";

type ArrayItemEqualsComparator<T> = (a: T, b: T) => boolean;

const defaultComparator = <T>(a: T, b: T) => a === b;

export const useArraySet = <T>(
  list: Array<T>,
  setList: (list: Array<T>) => void,
  comparator: ArrayItemEqualsComparator<T> = defaultComparator
) => {
  const add = useCallback(
    (item: T) => {
      if (!list.some((l) => comparator(l, item))) {
        setList([...list, item]);
      }
    },
    [list, setList, comparator]
  );

  const addMultiple = useCallback(
    (items: Array<T>) => {
      setList(
        items.reduce((list, item) => {
          if (!list.some((l) => comparator(l, item))) {
            return [...list, item];
          }
          return list;
        }, list)
      );
    },
    [list, setList, comparator]
  );

  const remove = useCallback(
    (item: T) => {
      const index = list.findIndex((l) => comparator(l, item));
      if (index >= 0) {
        setList(list.filter((_, i) => i !== index));
      }
    },
    [list, setList, comparator]
  );

  const removeMultiple = useCallback(
    (items: Array<T>) => {
      setList(list.filter((item) => !items.some((l) => comparator(l, item))));
    },
    [list, setList, comparator]
  );

  const toggle = useCallback(
    (item: T) => {
      const found = list.some((l) => comparator(l, item));
      if (found) {
        remove(item);
      } else {
        add(item);
      }
    },
    [list, add, remove, comparator]
  );

  return {
    add,
    addMultiple,
    remove,
    removeMultiple,
    toggle,
  };
};
