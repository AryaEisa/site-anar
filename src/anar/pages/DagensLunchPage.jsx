import { useEffect } from 'react';
import {
  dagensLunchKolgrill,
  dagensLunchMeta,
  dagensLunchVarmratter,
} from '../data/dagensLunchData';
import { useLanguage } from '../i18n/LanguageContext';
import { pickLocale } from '../i18n/localeText';

function DishBlock({ title, text, locale }) {
  return (
    <article className="dagens-dish">
      <h3 className="dagens-dish-title">{pickLocale(title, locale)}</h3>
      <p className="dagens-dish-text">{pickLocale(text, locale)}</p>
    </article>
  );
}

export default function DagensLunchPage() {
  const { t, locale } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="dagens" id="dagens-lunch">
      <header className="dagens-hero">
        <div className="dagens-hero-frame">
          <p className="dagens-kicker">{t('dagens.kicker')}</p>
          <h1 className="dagens-title">{t('dagens.title')}</h1>
          <p className="dagens-hours">
            <span className="dagens-hours-icon" aria-hidden="true">
              ◆
            </span>
            {t('dagens.hours')}
            <span className="dagens-hours-icon" aria-hidden="true">
              ◆
            </span>
          </p>
        </div>
      </header>

      <div className="dagens-included">
        <span className="dagens-included-line" aria-hidden="true" />
        <p className="dagens-included-text">{t('dagens.included')}</p>
        <span className="dagens-included-line" aria-hidden="true" />
      </div>

      <section className="dagens-panel" aria-labelledby="dagens-varm-heading">
        <div className="dagens-panel-head">
          <h2 className="dagens-panel-title" id="dagens-varm-heading">
            {t('dagens.classicsTitle')}
          </h2>
          <span className="dagens-price-tag">{dagensLunchMeta.varmratterPrice}</span>
        </div>
        <p className="dagens-panel-note">{t('dagens.panelNote')}</p>
        <div className="dagens-dishes">
          {dagensLunchVarmratter.map((d, i) => (
            <DishBlock key={`varm-${i}`} title={d.title} text={d.text} locale={locale} />
          ))}
        </div>
      </section>

      <section className="dagens-panel dagens-panel--grill" aria-labelledby="dagens-grill-heading">
        <div className="dagens-panel-head">
          <h2 className="dagens-panel-title" id="dagens-grill-heading">
            {t('dagens.grillTitle')}
            <span className="dagens-panel-sub">{t('dagens.grillSub')}</span>
          </h2>
        </div>
        <p className="dagens-panel-note dagens-panel-note--muted">{t('dagens.grillNote')}</p>
        <div className="dagens-dishes">
          {dagensLunchKolgrill.map((d, i) => (
            <DishBlock key={`grill-${i}`} title={d.title} text={d.text} locale={locale} />
          ))}
        </div>
      </section>
    </main>
  );
}
