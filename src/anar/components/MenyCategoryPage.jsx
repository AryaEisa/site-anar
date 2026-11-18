import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { pickLocale } from '../i18n/localeText';

function MenySectionBody({ sec, locale }) {
  return (
    <>
      {sec.intro?.map((para, i) => (
        <p key={i} className="meny-intro">
          {pickLocale(para, locale)}
        </p>
      ))}
      {sec.dishes?.map((d, i) => (
        <article key={i} className="meny-dish">
          <h3 className="meny-dish-title">{pickLocale(d.title, locale)}</h3>
          {(d.paragraphs ?? []).map((p, j) => {
            const paras = d.paragraphs ?? [];
            const isNote = paras.length > 1 && j === paras.length - 1;
            return (
              <p key={j} className={isNote ? 'meny-dish-note' : 'meny-dish-p'}>
                {pickLocale(p, locale)}
              </p>
            );
          })}
        </article>
      ))}
      {sec.sublists?.map((sl, i) => (
        <div key={i} className="meny-sublist">
          <h3 className="meny-sublist-title">{pickLocale(sl.line, locale)}</h3>
          <ul className="meny-bullets">
            {sl.items.map((it, j) => (
              <li key={j}>{pickLocale(it, locale)}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default function MenyCategoryPage({
  sections,
  sectionKeyPrefix,
  domPrefix,
  panelId,
  mainId,
  mainClassName,
  heroKeys,
  filterAriaKey,
  closeSheetAriaKey,
}) {
  const { pathname } = useLocation();
  const { t, locale } = useLanguage();
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const scrollPanelAfterCategoryPickRef = useRef(false);
  const panelRef = useRef(null);

  const sectionTitle = (id) => t(`${sectionKeyPrefix}.${id}`);

  const activeSection = useMemo(
    () => sections.find((s) => s.id === activeId) ?? sections[0],
    [activeId, sections]
  );

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  useLayoutEffect(() => {
    if (!scrollPanelAfterCategoryPickRef.current) return;
    scrollPanelAfterCategoryPickRef.current = false;
    panelRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, [activeId]);

  useEffect(() => {
    if (!filterSheetOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setFilterSheetOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [filterSheetOpen]);

  const selectCategory = (id) => {
    if (id !== activeId) {
      scrollPanelAfterCategoryPickRef.current = true;
    }
    setActiveId(id);
    setFilterSheetOpen(false);
  };

  const headingId = activeSection ? `${domPrefix}-heading-${activeSection.id}` : undefined;
  const filterSheetDomId = `${domPrefix}-filter-sheet`;
  const sheetTitleId = `${domPrefix}-sheet-title`;

  return (
    <main className={mainClassName} id={mainId}>
      <header className="meny-hero">
        <p className="meny-eyebrow">{t(heroKeys.eyebrow)}</p>
        <h1 className="meny-title">{t(heroKeys.title)}</h1>
        <p className="meny-lede">{t(heroKeys.lede)}</p>
      </header>

      <div className="meny-layout">
        <nav className="meny-filter" aria-label={t(filterAriaKey)}>
          <div className="meny-filter-desktop">
            <div className="meny-filter-label">{t('meny.filterLabel')}</div>
            <div className="meny-filter-list" role="tablist" aria-orientation="vertical">
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`${domPrefix}-tab-${s.id}`}
                  aria-selected={activeId === s.id}
                  aria-controls={panelId}
                  className={`meny-filter-btn${activeId === s.id ? ' meny-filter-btn--active' : ''}`}
                  onClick={() => selectCategory(s.id)}
                >
                  {sectionTitle(s.id)}
                </button>
              ))}
            </div>
          </div>

          <div className="meny-filter-mobile">
            <button
              type="button"
              className="meny-filter-open"
              aria-expanded={filterSheetOpen}
              aria-controls={filterSheetDomId}
              aria-haspopup="dialog"
              onClick={() => setFilterSheetOpen(true)}
            >
              <span className="meny-filter-open-row">
                <span className="meny-filter-open-kicker">{t('meny.chooseCategory')}</span>
                <span className="meny-filter-open-chevron" aria-hidden="true">
                  ▼
                </span>
              </span>
              <span className="meny-filter-open-current">{sectionTitle(activeSection.id)}</span>
            </button>
          </div>
        </nav>

        <div
          ref={panelRef}
          className="meny-panel"
          id={panelId}
          role="tabpanel"
          aria-labelledby={headingId}
        >
          {activeSection && (
            <section className="meny-section" aria-labelledby={headingId}>
              <div className="meny-section-card">
                <h2 className="meny-section-title" id={headingId}>
                  {sectionTitle(activeSection.id)}
                </h2>
                <div className="meny-section-body">
                  <MenySectionBody sec={activeSection} locale={locale} />
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {filterSheetOpen && (
        <div className="meny-sheet-root">
          <button
            type="button"
            className="meny-sheet-backdrop"
            aria-label={t(closeSheetAriaKey)}
            onClick={() => setFilterSheetOpen(false)}
          />
          <div
            id={filterSheetDomId}
            className="meny-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby={sheetTitleId}
          >
            <div className="meny-sheet-handle" aria-hidden="true" />
            <h2 className="meny-sheet-title" id={sheetTitleId}>
              {t('meny.sheetTitle')}
            </h2>
            <ul className="meny-sheet-list">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={`meny-sheet-option${activeId === s.id ? ' meny-sheet-option--active' : ''}`}
                    onClick={() => selectCategory(s.id)}
                  >
                    {sectionTitle(s.id)}
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="meny-sheet-close" onClick={() => setFilterSheetOpen(false)}>
              {t('meny.close')}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
