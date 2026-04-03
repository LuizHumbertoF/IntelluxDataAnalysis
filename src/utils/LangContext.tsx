import type { ReactNode } from "react";
import { createContext } from "react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export type LanguageOptions = "pt-br" | "en" | "es";

type LangContextType = {
  selectedLanguage: LanguageOptions;
  setSelectedLanguage: Dispatch<SetStateAction<LanguageOptions>>;
};

export const LangContext = createContext<LangContextType | null>(null);

export function LangContextProvider({ children }: { children: ReactNode }) {
    const LN_BR :LanguageOptions = "pt-br";
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageOptions>(LN_BR);

    return (
        <LangContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
            {children}
        </LangContext.Provider>
    );

}