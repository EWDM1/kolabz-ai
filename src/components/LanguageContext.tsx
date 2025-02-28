
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the supported languages
type Language = "en" | "es" | "fr" | "pt";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  languageOptions: { value: Language; label: string }[];
};

// Define the language options
const languageOptions: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "pt", label: "Português" },
];

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  languageOptions,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get from local storage or default to English
    const savedLanguage = localStorage.getItem("kolabz-language");
    return (savedLanguage as Language) || "en";
  });

  useEffect(() => {
    // Save to local storage when language changes
    localStorage.setItem("kolabz-language", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languageOptions }}>
      {children}
    </LanguageContext.Provider>
  );
};
