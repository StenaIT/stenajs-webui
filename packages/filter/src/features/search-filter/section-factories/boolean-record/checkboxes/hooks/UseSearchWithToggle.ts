import { FilterEntity } from "../../../../types/FilterEntity";
import { RefObject, useCallback, useMemo, useState } from "react";
import { useArraySet } from "@stenajs-webui/core";

export const useSearchWithToggle = <T extends FilterEntity>(
  entityList: Array<T>,
  filterList: Array<T>,
  setFilterList: (list: Array<T>) => void,
  commit: () => void,
  nameResolver: (entity: T) => string,
  codeResolver: (entity: T) => string,
  inputRef: RefObject<HTMLInputElement>,
  commitOnChange: boolean
) => {
  const [textSearchValue, setTextSearchValue] = useState("");
  const { toggle, addMultiple, removeMultiple } = useArraySet(
    filterList,
    setFilterList,
    (a, b) => a.id === b.id
  );

  const checkboxClickHandler = (_: boolean, id: string) => {
    const entityToToggle = entityList.find((e) => e.id === id);
    if (entityToToggle) {
      toggle(entityToToggle);
      if (commitOnChange) {
        commit();
      }
    }
  };

  const filteredList = useMemo(() => {
    if (!textSearchValue) {
      return entityList;
    }
    const s = textSearchValue.toUpperCase();
    const r = entityList.find((r) => codeResolver(r).toUpperCase() === s);
    if (r) {
      return [r];
    }
    return entityList.filter((r) => {
      if (codeResolver(r).toUpperCase().indexOf(s) >= 0) {
        return true;
      }
      if (nameResolver(r).toUpperCase().indexOf(s) >= 0) {
        return true;
      }
      return false;
    });
  }, [codeResolver, nameResolver, entityList, textSearchValue]);

  const onEnter = useCallback(() => {
    if (textSearchValue && filteredList.length) {
      const firstEntityIsChecked = !!filterList.find(
        (l) => l.id === filteredList[0].id
      );
      if (firstEntityIsChecked) {
        removeMultiple(filteredList);
      } else {
        addMultiple(filteredList);
      }
      commit();
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [
    filterList,
    inputRef,
    filteredList,
    textSearchValue,
    addMultiple,
    removeMultiple,
    commit,
  ]);

  return {
    checkboxClickHandler,
    filteredList,
    textSearchValue,
    setTextSearchValue,
    onEnter,
  };
};
