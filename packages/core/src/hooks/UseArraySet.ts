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

  const addMultiple = useCallback(
    (items: Array<T>) => {
      setList(
        items.reduce((list, item) => {
          if (list.indexOf(item) < 0) {
            return [...list, item];
          }
          return list;
        }, list)
      );
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

  const removeMultiple = useCallback(
    (items: Array<T>) => {
      setList(list.filter(item => items.indexOf(item) < 0));
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
    addMultiple,
    remove,
    removeMultiple,
    toggle
  };
};
