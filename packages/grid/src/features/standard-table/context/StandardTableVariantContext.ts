import { createContext, useContext } from "react";
import { StandardTableVariant } from "../components/StandardTable";

export const StandardTableVariantContext =
  createContext<StandardTableVariant>("standard");

export const useStandardTableVariant = () =>
  useContext(StandardTableVariantContext);
