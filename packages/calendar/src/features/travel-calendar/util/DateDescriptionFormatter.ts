import { format, Locale } from "date-fns";

export const formatDateDescription = (date: Date, locale: Locale) =>
  format(date, "eee MMM do", { locale });

export const formatDateDescriptionLong = (date: Date, locale: Locale) =>
  format(date, "eeee MMMM do", { locale });
