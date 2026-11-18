import { useEffect } from 'react';
import { kolgrillDishes } from '../data/kolgrillData';
import { useLanguage } from '../i18n/LanguageContext';
import { pickLocale } from '../i18n/localeText';

export default function KolgrillPage() {
  const { t, locale } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="kolgrill" id="kolgrill">
      <header className="kolgrill-hero">
        <div className="kolgrill-hero-frame">
          <p className="kolgrill-kicker">{t('kolgrill.kicker')}</p>
          <h1 className="kolgrill-title">{t('kolgrill.title')}</h1>
          <p className="kolgrill-lead">{t('kolgrill.lead')}</p>
        </div>
      </header>

      <section className="kolgrill-panel" aria-label={t('kolgrill.panelAria')}>
        <div className="kolgrill-dishes">
          {kolgrillDishes.map((d, di) => (
            <article key={`kol-${di}`} className="kolgrill-dish">
              <h2 className="kolgrill-dish-title">{pickLocale(d.title, locale)}</h2>
              {d.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    d.paragraphs.length > 1 && i === d.paragraphs.length - 1
                      ? 'kolgrill-dish-note'
                      : 'kolgrill-dish-text'
                  }
                >
                  {pickLocale(p, locale)}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
