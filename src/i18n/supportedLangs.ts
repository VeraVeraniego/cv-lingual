import cvEs from "cv.json";
import cvEn from "cv_english.json";

const langs = {
  en: { cv: cvEn, title: "EN" },
  es: { cv: cvEs, title: "ES" },
};

export type Locales = keyof typeof langs;

export const getCV = (locale?: string) => {
  const cv = langs[locale as Locales].cv;

  if (!cv) return cvEn;

  return cv;
};

export const getLangs = () =>
  Object.keys(langs).map((locale) => ({
    title: langs[locale as Locales].title,
    locale,
  }));
