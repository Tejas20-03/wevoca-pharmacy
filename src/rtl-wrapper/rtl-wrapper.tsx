import { useLanguage } from "@/language-context/LanguageContext";
import React from "react";

const RTLWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  return <div dir={language === "ar" ? "rtl" : "ltr"}>{children}</div>;
};

export default RTLWrapper;
