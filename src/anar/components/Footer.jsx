import { Link } from 'react-router-dom';
import { useSite } from '@bookingsystemadvancedorg/site-kit';
import { useLanguage } from '../i18n/LanguageContext';

const ALLABOLAG_URL =
  'https://www.allabolag.se/foretag/anar-ab/link%C3%B6ping/restauranger/2KIC4IUI5YH9F';

export const DEVELOPER = 'IT Hjälparna Nordic AB';

/** children: det som ska stå överst i sidfoten (öppettider och länkar på mobil, MobilePreFooterNav). */
export default function Footer({ children = null }) {
  const { t } = useLanguage();
  const { config } = useSite();
  const year = new Date().getFullYear();
  // Bolagsnamn och organisationsnummer från Booqy (versaler som i designen).
  const legalName = (config.legal.legalName || config.tenant.name).toUpperCase();

  return (
    <footer className="site-footer">
      {children}
      <div className="site-footer-main">
        <a
          className="site-footer-org"
          href={ALLABOLAG_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="site-footer-org-name" translate="no">
            {legalName}
          </span>
          {config.legal.orgNumber && (
            <span className="site-footer-org-number" translate="no">
              {config.legal.orgNumber}
            </span>
          )}
        </a>
        <p className="site-footer-rights">
          © {year} <span translate="no">{legalName}</span>.{' '}
          <span>{t('footer.rights')}</span>
        </p>
        <div className="site-footer-credit-block">
          <p className="site-footer-credit">
            {t('footer.credit')}{' '}
            {/* The developer's company name is never translated. */}
            <span translate="no">{DEVELOPER}</span>
          </p>
          <p className="site-footer-dev-site">
            <a
              className="site-footer-dev-link"
              href="https://www.ithjalparna.se"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.ithjalparna.se
            </a>
          </p>
        </div>
      </div>
      <div className="site-footer-sub">
        {/* På mobil står de i raden ovanför sidfoten (MobilePreFooterNav), så här döljs de där. */}
        <nav className="site-footer-legal site-footer-pages" aria-label={t('a11y.footerPages')}>
          <Link to="/historia">{t('nav.historia')}</Link>
          <Link to="/kontakt">{t('nav.kontakt')}</Link>
        </nav>
        <nav className="site-footer-legal" aria-label="Juridiskt">
          <Link to="/integritetspolicy">Integritetspolicy</Link>
          <Link to="/cookies">Cookies</Link>
          {config.tenant.features.reservations && <Link to="/bokningsvillkor">Bokningsvillkor</Link>}
        </nav>
      </div>
    </footer>
  );
}
