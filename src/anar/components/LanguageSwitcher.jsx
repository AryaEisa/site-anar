import { useLanguage } from '../i18n/LanguageContext';
import '../styles/language-switcher.css';

const LOCALES = [
  { id: 'sv', labelKey: 'lang.sv' },
  { id: 'en', labelKey: 'lang.en' },
  { id: 'fa', labelKey: 'lang.fa' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="language-switcher-ltr" dir="ltr">
      <div className="language-switcher">
        <div className="language-switcher-select-wrap">
          <select
            id="site-language"
            className="language-switcher-select"
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            aria-label={t('lang.switch')}
          >
            {LOCALES.map(({ id, labelKey }) => (
              <option key={id} value={id}>
                {t(labelKey)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
