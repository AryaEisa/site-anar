import { LanguagePicker } from '../../shared/lang';

/**
 * Språkväljaren i toppbandet längst till höger (på telefon bredvid
 * menyknappen). Kitets väljare (flagga och kod, svenska, engelska, spanska,
 * arabiska, persiska) i Anars svarta glas. Översättningen görs av site-kit
 * (Amazon Translate). På en site-kit-version utan språkstöd (0.3.0) visas
 * ingenting.
 */
export default function LanguageSwitcher() {
  if (!LanguagePicker) return null;
  return (
    <div className="language-switcher" dir="ltr">
      <LanguagePicker className="language-switcher-picker" />
    </div>
  );
}
