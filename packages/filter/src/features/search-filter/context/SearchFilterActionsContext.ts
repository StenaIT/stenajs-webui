import { createContext, useContext } from "react";
import { SearchFilterActions } from "../redux/SearchFilterRedux";

export const SearchFilterActionsContext = createContext<
  SearchFilterActions<unknown, any>
>((null as unknown) as SearchFilterActions<unknown, any>);

export const useSearchFilterActions = <
  TFormModel,
  TSectionKey extends string
>() => {
  const c = useContext(SearchFilterActionsContext);
  if (!c) {
    throw new Error("Missing search filter actions context.");
  }
  return c as SearchFilterActions<TFormModel, TSectionKey>;
};
