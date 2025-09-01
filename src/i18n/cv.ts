import cvEs from "cv.json";
import cvEn from "cv_english.json";
import type { Locales } from "./../types";

const cvs = { en: cvEn, es: cvEs };

export const getCV = (locale?: string) => {
  const cv = cvs[locale as Locales];

  if (!cv) return cvEn;

  return cv;
};
