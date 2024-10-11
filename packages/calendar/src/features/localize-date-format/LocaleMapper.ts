import { Locale } from "date-fns";
import {
  da,
  de,
  deAT,
  enGB,
  enUS,
  es,
  fr,
  nb,
  nl,
  pl,
  sv,
} from "date-fns/locale";

type LocalesMap = {
  [key: string]: Locale;
};

const locales: LocalesMap = {
  "en-US": enUS,
  "en-GB": enGB,
  "de-AT": deAT,
  "de-DE": de,
  fr,
  de,
  es,
  sv,
  pl,
  da,
  nl,
  nb,
};

export const getLocaleForLocaleCode = (
  localeCode: string,
): Locale | undefined => {
  return locales[localeCode];
};

export const getDefaultLocaleForFormatting = (): Locale => {
  return locales["sv"];
};
