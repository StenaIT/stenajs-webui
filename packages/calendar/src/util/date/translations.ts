import {
  cs,
  da,
  de,
  enGB,
  et,
  es,
  fi,
  fr,
  it,
  lt,
  lv,
  nl,
  nb,
  pl,
  ru,
  sv
} from "date-fns/locale";

const locales = {
  cs,
  da,
  de,
  enGB,
  et,
  es,
  fi,
  fr,
  it,
  lt,
  lv,
  nl,
  nb,
  pl,
  ru,
  sv
};
const weekName = {
  cs: "T",
  da: "u",
  de: "w",
  enGB: "w",
  et: "n",
  es: "s",
  fi: "v",
  fr: "s",
  it: "s",
  lt: "s",
  lv: "s",
  nl: "w",
  nb: "u",
  pr: "t",
  ru: "н",
  sv: "v"
};

export type Language = keyof typeof locales;

export interface Translations {
  locale: Locale;
  weekName: string;
}

export const getTranslations = (language: Language = "enGB"): Translations => {
  return {
    locale: locales[language],
    weekName: weekName[language]
  };
};
