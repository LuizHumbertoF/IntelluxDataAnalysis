import type { LanguageOptions } from "./LangContext";

export function renderLang(language: LanguageOptions, br_string: string, us_string: string, es_string: string) {
    switch(language) {
        case "pt-br": 
            return br_string;
        case "en":
            return us_string;
        case "es":
            return es_string;
    }
};