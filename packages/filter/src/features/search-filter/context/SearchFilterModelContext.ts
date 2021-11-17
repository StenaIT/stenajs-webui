import { createContext, useContext } from "react";

export const SearchFilterModelContext = createContext<unknown>(null as unknown);

export const useSearchFilterModel = <TFormModel>(): TFormModel => {
  const c = useContext(SearchFilterModelContext);
  if (!c) {
    throw new Error("Missing search filter state context.");
  }
  return c as TFormModel;
};
