import { useEffect } from 'react';
import { MenuState } from '../components/MenyCategoryPage';
import { descriptionParts, priceText, useBooqyMenu } from '../data/booqyMenu';
import { useLanguage } from '../i18n/LanguageContext';

/** Kolgrill: rätterna i Booqys kolgrillkategorier (data/booqyMenu.js). */
export default function KolgrillPage() {
  const { t } = useLanguage();
  const { loading, error, retry, sections } = useBooqyMenu();
  const dishes = sections.filter((s) => s.page === 'kolgrill').flatMap((s) => s.items);

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

      {dishes.length === 0 ? (
        <MenuState loading={loading} error={error} retry={retry} />
      ) : (
        <section className="kolgrill-panel" aria-label={t('kolgrill.panelAria')}>
          <div className="kolgrill-dishes">
            {dishes.map((d) => {
              const price = priceText(d);
              const { text, note } = descriptionParts(d);
              return (
                <article key={d.menuItemId} className="kolgrill-dish">
                  <h2 className="kolgrill-dish-title">
                    {d.name}
                    {price && ` - ${price}`}
                  </h2>
                  {text.map((p, i) => (
                    <p key={i} className="kolgrill-dish-text">
                      {p}
                    </p>
                  ))}
                  {note && <p className="kolgrill-dish-note">{note}</p>}
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
