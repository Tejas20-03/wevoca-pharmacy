import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext<{
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}>({
  language: "en",
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
