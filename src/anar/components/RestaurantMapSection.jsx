import { useLanguage } from '../i18n/LanguageContext';

const LINE1 = 'Djurgårdsgatan 33A';
const LINE2 = '582 29 Linköping';

const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
  `ANAR Restaurang & Bar, ${LINE1}, ${LINE2}`
)}&z=16&output=embed&iwloc=near`;

const MAPS_NAV = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `ANAR Restaurang & Bar, ${LINE1}, ${LINE2}`
)}`;

export default function RestaurantMapSection() {
  const { t } = useLanguage();
  const name = t('map.name');

  return (
    <section className="home-map" aria-labelledby="home-map-heading">
      <div className="home-map-inner">
        <h2 className="home-map-title" id="home-map-heading">
          {t('map.title')}
        </h2>
        <p className="home-map-address">
          <span className="home-map-name">{name}</span>
          <span className="home-map-lines">
            {LINE1}
            <br />
            {LINE2}
          </span>
        </p>

        <div className="home-map-frame">
          <iframe
            title={t('map.iframeTitle')}
            className="home-map-iframe"
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a className="home-map-nav" href={MAPS_NAV} target="_blank" rel="noopener noreferrer">
          {t('map.navigate')}
        </a>
      </div>
    </section>
  );
}
