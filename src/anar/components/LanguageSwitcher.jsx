import { Select } from '@bookingsystemadvancedorg/site-kit';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/language-switcher.css';

const LOCALES = [
  { id: 'sv', labelKey: 'lang.sv' },
  { id: 'en', labelKey: 'lang.en' },
  { id: 'fa', labelKey: 'lang.fa' },
];

/** Språkväljaren: kitets rullista (öppnas i Anars look, aldrig systemets meny). */
export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="language-switcher-ltr" dir="ltr">
      <div className="language-switcher">
        <Select
          id="site-language"
          className="language-switcher-select"
          value={locale}
          onChange={setLocale}
          aria-label={t('lang.switch')}
          options={LOCALES.map(({ id, labelKey }) => ({ value: id, label: t(labelKey) }))}
        />
      </div>
    </div>
  );
}
