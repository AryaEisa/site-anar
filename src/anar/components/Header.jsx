import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png';
import OpeningHoursDropdown from './OpeningHoursDropdown';
import OpeningHoursModal from './OpeningHoursModal';
import { useLanguage } from '../i18n/LanguageContext';

const LEFT_NAV = [
  { key: 'nav.meny', to: '/meny' },
  { key: 'nav.kolgrill', to: '/kolgrill' },
  { key: 'nav.drinkmeny', to: '/drinkmeny' },
  { key: 'nav.dagensLunch', to: '/dagens-lunch' },
];

const RIGHT_NAV = [
  { key: 'nav.historia', to: '/historia' },
  { key: 'nav.parkering', to: '/parkering' },
  { key: 'nav.kontakt', to: '/kontakt' },
];

export default function Header() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoursModalOpen, setHoursModalOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const openingHoursDesktopRef = useRef(null);
  const prevMenuOpen = useRef(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (prevMenuOpen.current && !menuOpen) {
      menuBtnRef.current?.focus();
    }
    prevMenuOpen.current = menuOpen;
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="site-header-gutter" aria-hidden="true" />

        <nav className="site-header-nav site-header-nav--left" aria-label={t('a11y.navLeft')}>
          <ul>
            {LEFT_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{t(item.key)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="site-header-brand" to="/" aria-label={t('a11y.home')}>
          <img src={logoImg} alt="" width={88} height={88} />
        </Link>

        <nav className="site-header-nav site-header-nav--right" aria-label={t('a11y.navRight')}>
          <ul>
            {RIGHT_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{t(item.key)}</Link>
              </li>
            ))}
            <li>
              <OpeningHoursDropdown
                ref={openingHoursDesktopRef}
                open={hoursModalOpen}
                onOpenChange={setHoursModalOpen}
              />
            </li>
          </ul>
        </nav>

        <button
          ref={menuBtnRef}
          type="button"
          className={`site-header-burger${menuOpen ? ' site-header-burger--open' : ''}`}
          aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="site-header-burger-line" aria-hidden="true" />
          <span className="site-header-burger-line" aria-hidden="true" />
          <span className="site-header-burger-line" aria-hidden="true" />
        </button>
      </header>

      <div
        className={`mobile-drawer-backdrop${menuOpen ? ' mobile-drawer-backdrop--visible' : ''}`}
        aria-hidden="true"
        onClick={closeMenu}
      />

      <aside
        id="mobile-drawer"
        className={`mobile-drawer${menuOpen ? ' mobile-drawer--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label={t('a11y.mobileNav')}>
          <ul className="mobile-drawer-list">
            {LEFT_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={closeMenu}>
                  {t(item.key)}
                </Link>
              </li>
            ))}
            {RIGHT_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={closeMenu}>
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="mobile-drawer-hours-trigger"
                onClick={() => {
                  closeMenu();
                  setHoursModalOpen(true);
                }}
              >
                {t('hours.title')}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <OpeningHoursModal
        open={hoursModalOpen}
        onClose={() => setHoursModalOpen(false)}
        desktopTriggerContainerRef={openingHoursDesktopRef}
      />
    </>
  );
}
