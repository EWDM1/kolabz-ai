
import React, { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "@/translations/en";
import esTranslations from "@/translations/es";
import frTranslations from "@/translations/fr";
import ptTranslations from "@/translations/pt";

// Define the supported languages
type Language = "en" | "es" | "fr" | "pt";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  languageOptions: { value: Language; label: string }[];
  t: (key: string, defaultText?: string) => string;
};

// Define the language options
const languageOptions: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "pt", label: "Português" },
];

// Dictionary of translations
const translations: Record<Language, Record<string, string>> = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  pt: ptTranslations
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  languageOptions,
  t: (key: string, defaultText?: string) => defaultText || key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get from local storage or default to English
    const savedLanguage = localStorage.getItem("kolabz-language");
    // Validate that the saved language is one of our supported languages
    return (languageOptions.some(option => option.value === savedLanguage) 
      ? savedLanguage as Language 
      : "en"); // Always default to English if invalid or no saved language
  });

  useEffect(() => {
    // Save to local storage when language changes
    localStorage.setItem("kolabz-language", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  // Translation function
  const t = (key: string, defaultText?: string): string => {
    // Get the current language's translations
    const langTranslations = translations[language] || {};
    
    // If translation exists in the current language, use it
    if (langTranslations[key]) {
      return langTranslations[key];
    }
    
    // If not found in current language but we're not in English, try English as fallback
    if (language !== "en" && translations.en[key]) {
      return translations.en[key];
    }
    
    // Return the provided default text or the key itself as last resort
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languageOptions, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
