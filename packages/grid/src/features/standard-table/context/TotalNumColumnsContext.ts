import { createContext, useContext } from "react";

export const TotalNumColumnsContext = createContext<number>(0);

export const useTotalNumColumns = () => useContext(TotalNumColumnsContext);
