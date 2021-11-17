import { createContext, useContext } from "react";
import { SearchFilterDispatch } from "../redux/SearchFilterRedux";

export const SearchFilterDispatchContext = createContext<
  SearchFilterDispatch<unknown>
>((null as unknown) as SearchFilterDispatch<unknown>);

export const useSearchFilterDispatch = () => {
  const c = useContext(SearchFilterDispatchContext);
  if (!c) {
    throw new Error("Missing search filter dispatch context.");
  }
  return c;
};
