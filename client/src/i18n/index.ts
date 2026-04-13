import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { zh } from './zh';
import { fr } from './fr';

export type Language = 'zh' | 'fr';
export type Translation = typeof fr;

const translations: Record<Language, Translation> = {
  zh,
  fr,
};

interface I18nState {
  language: Language;
  t: Translation;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

// French is the default language
export const useI18n = create<I18nState>()(
  persist(
    (set, get) => ({
      language: 'fr',
      t: translations.fr,
      setLanguage: (lang: Language) => {
        set({ language: lang, t: translations[lang] });
      },
      toggleLanguage: () => {
        const newLang = get().language === 'fr' ? 'zh' : 'fr';
        set({ language: newLang, t: translations[newLang] });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);

// Helper function for components that can't use hooks
export function getTranslation(lang: Language): Translation {
  return translations[lang];
}
