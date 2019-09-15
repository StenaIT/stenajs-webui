import { createContext } from "react";
import { getTranslations } from "./Translations";

export const TranslationContext = createContext(getTranslations());
