import { createContext } from "react";
import { getTranslations } from "./translations";

export const TranslationContext = createContext(getTranslations());
export const TranslationProvider = TranslationContext.Provider;
