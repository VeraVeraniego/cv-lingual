import cvEs from "cv.json";
import cvEn from "cv_english.json";

// Unified i18n configuration containing CV data, translations, and language metadata
export const i18nConfig = {
  en: {
    title: "EN",
    cv: cvEn,
    translations: {
      index: { title: "{name}'s Portfolio - {label}" },
      hero: {
        email: "Send mail to {name}'s mail {email}",
        phone: "Call {name} by phone at {phone}",
        profiles: "Visit {name}'s profile on {network}",
      },
      about: { title: "About me" },
      experience: {
        title: "Work Experience",
        end: "Present",
        see: "See {name}",
      },
      education: { title: "Education", end: "Present" },
      projects: {
        title: "Projects",
        see: "See project {name}",
        sourceCode: "See source code of {name} project",
      },
      skills: { title: "Skills" },
      km: {
        helper: { 1: "Press", 2: "to open command palette." },
        section: { social: "Social", visit: "Visit {network}" },
        search: "Search command",
        client: { print: "Print", actions: "Actions" },
        palette: {
          select: "to select",
          navigate: "to navigate",
          close: "to close",
        },
      },
    },
  },
  es: {
    title: "ES",
    cv: cvEs,
    translations: {
      index: { title: "Portafolio de {name} - {label}" },
      hero: {
        email: "Enviar un correo electrónico a {name} al correo {email}",
        phone: "Llamar por teléfono a {name} al número {phone}",
        profiles: "Visitar el perfil de {name} en {network}",
      },
      about: { title: "Sobre mí" },
      experience: {
        title: "Experiencia laboral",
        end: "Actual",
        see: "Ver {name}",
      },
      education: { title: "Educación", end: "Actual" },
      projects: {
        title: "Proyectos",
        see: "Ver el proyecto {name}",
        sourceCode: "Ver código fuente del proyecto {name}",
      },
      skills: { title: "Habilidades" },
      km: {
        helper: {
          1: "Pulsa",
          2: "para abrir la paleta de comandos.",
        },
        section: { social: "Social", visit: "Visitar {network}" },
        search: "Buscar comando",
        client: { print: "Imprimir", actions: "Acciones" },
        palette: {
          select: "para seleccionar",
          navigate: "para navegar",
          close: "para cerrar",
        },
      },
    },
  },
} as const;

export type Locales = keyof typeof i18nConfig;

const replaceTemplate = (text: string, params: Record<string, string>) => {
  const wordsInBrackets = [...text.matchAll(/\\{([^{}]*)\\}/g)].map(
    (m) => m[1]
  );
  const hasWordsInBrackets = wordsInBrackets.length > 0;
  if (!hasWordsInBrackets) return text;

  const paramsList = Object.keys(params);

  wordsInBrackets.every((word) => {
    const isIncluded = paramsList.includes(word);
    console.assert(isIncluded, `Couldn't find {${word}} value on: ${text}`);
    return isIncluded;
  });

  return paramsList.reduce(
    (text, param) => text.replace(new RegExp(`{${param}}`, "g"), params[param]),
    text
  );
};

export const getCV = (locale?: string) => {
  const cv = i18nConfig[locale as Locales]?.cv;
  return cv || i18nConfig.en.cv;
};

export const getLangs = () =>
  Object.keys(i18nConfig).map((locale) => ({
    title: i18nConfig[locale as Locales].title,
    locale,
  }));

export const setLanguage = (locale?: string) => {
  const lang = locale as Locales;
  const dictionary =
    i18nConfig[lang]?.translations || i18nConfig.en.translations;

  const getTranslation = (key: string, params = {}) => {
    const keys = key?.split(".");
    let value = dictionary;

    for (const k of keys) {
      // @ts-ignore
      value = value?.[k];
    }

    if (!value || typeof value !== "string") {
      console.warn(`Couldn't find a ${locale}/translation for`, key);
      return key;
    }
    return replaceTemplate(`${value}`, params);
  };

  return { getTranslation };
};
