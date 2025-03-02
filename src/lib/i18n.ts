
// A simple internationalization (i18n) utility

/**
 * Create an i18n instance with the given translations
 */
export function createI18n(translations: Record<string, string>) {
  let currentLocale = 'en';

  /**
   * Get translation for the given key
   */
  const t = (key: string, defaultText?: string): string => {
    return translations[key] || defaultText || key;
  };

  /**
   * Set the current locale
   */
  const setLocale = (locale: string) => {
    currentLocale = locale;
  };

  return {
    t,
    locale: currentLocale,
    setLocale,
  };
}
