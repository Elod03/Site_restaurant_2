import { Globe } from 'lucide-react';
import { useI18n, type Language } from '@/i18n';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <button
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-accent transition-colors"
      onClick={() => {
        const nextLang: Language = language === 'fr' ? 'zh' : 'fr';
        setLanguage(nextLang);
      }}
      title={language === 'fr' ? 'Passer en chinois' : 'Switch to French'}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">
        {language === 'fr' ? '中' : 'FR'}
      </span>
    </button>
  );
}
