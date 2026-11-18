import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { STRINGS } from './strings';

const STORAGE_KEY = 'anar-lang';

const LOCALES = {
  sv: { tag: 'sv-SE', dir: 'ltr' },
  en: { tag: 'en-GB', dir: 'ltr' },
  fa: { tag: 'fa-IR', dir: 'rtl' },
};

const LanguageContext = createContext(null);

function readStoredLocale() {
  if (typeof window === 'undefined') return 'sv';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'fa' || saved === 'sv') return saved;
  return 'sv';
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(readStoredLocale);

  const setLocale = useCallback((next) => {
    if (next !== 'sv' && next !== 'en' && next !== 'fa') return;
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const { tag, dir } = LOCALES[locale] ?? LOCALES.sv;
    document.documentElement.lang = tag;
    document.documentElement.dir = dir;
  }, [locale]);

  const t = useCallback(
    (key, params) => {
      const table = STRINGS[locale] ?? STRINGS.sv;
      let s = table[key] ?? STRINGS.sv[key] ?? key;
      if (params && typeof s === 'string') {
        s = s.replace(/\{(\w+)\}/g, (_, k) =>
          Object.prototype.hasOwnProperty.call(params, k) ? String(params[k]) : `{${k}}`
        );
      }
      return s;
    },
    [locale]
  );

  const localeTag = LOCALES[locale]?.tag ?? 'sv-SE';

  const value = useMemo(
    () => ({ locale, setLocale, t, localeTag }),
    [locale, setLocale, t, localeTag]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
