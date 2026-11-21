import { Link } from 'react-router-dom';
import OpeningHoursContent from './OpeningHoursContent';
import { useLanguage } from '../i18n/LanguageContext';

const LINKS = [
  { to: '/meny', key: 'nav.meny' },
  { to: '/drinkmeny', key: 'nav.drinkmeny' },
  { to: '/historia', key: 'nav.historia' },
  { to: '/parkering', key: 'nav.parkering' },
  { to: '/kontakt', key: 'nav.kontakt' },
];

/**
 * Endast mobil och surfplatta (upp till 800 px): längst ned, inuti den svarta sidfoten, står
 * öppettiderna (ett dragspel) och under dem länkarna till sidorna. På dator ligger tiderna i
 * rutan under "Öppettider" i headern och länkarna i headern och sidfoten.
 */
export default function MobilePreFooterNav() {
  const { t } = useLanguage();

  return (
    <nav className="mobile-pre-footer" aria-label={t('a11y.preFooterNav')}>
      <div className="mobile-pre-footer-hours">
        <p className="mobile-pre-footer-hours-heading">{t('hours.title')}</p>
        <OpeningHoursContent
          className="opening-hours--mobile-pre-footer"
          sectionIds={['restaurant', 'lunch', 'middag']}
          accordion
        />
      </div>
      <ul className="mobile-pre-footer-links">
        {LINKS.map((item) => (
          <li key={item.to}>
            <Link className="mobile-pre-footer-link" to={item.to}>
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
