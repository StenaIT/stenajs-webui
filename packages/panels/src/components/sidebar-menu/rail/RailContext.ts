import { createContext, useContext } from "react";

export const RailContext = createContext<boolean | undefined>(false);

export const useRailContext = () => useContext(RailContext);
