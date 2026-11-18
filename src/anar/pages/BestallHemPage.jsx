import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import uberEatsImg from '../images/delivery/ubereats.png';
import foodoraImg from '../images/Foodora.png';
import { useLanguage } from '../i18n/LanguageContext';

const UBER_EATS_URL =
  'https://www.ubereats.com/gb/store/anar-restaurang-%26-bar/YgJoeKTkU4yRdOcXcNzB7Q?diningMode=DELIVERY&sc=SEARCH_SUGGESTION';

const FOODORA_WEB = 'https://www.foodora.se/restaurant/t5ix/anar-restaurang-and-bar';
const FOODORA_APP = 'https://foodorase.page.link/3enPXQfwXKuMinZS6';

const PHONE_TEL = '+46760056857';
const PHONE_DISPLAY = '076-0056 857';

export default function BestallHemPage() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bestall-hem" id="bestall">
      <header className="bestall-hem-hero">
        <p className="bestall-hem-eyebrow">{t('bestall.eyebrow')}</p>
        <h1 className="bestall-hem-title">{t('bestall.h1')}</h1>
        <p className="bestall-hem-intro">{t('bestall.intro')}</p>
      </header>

      <div className="bestall-hem-grid">
        <div className="bestall-hem-card bestall-hem-card--uber">
          <span className="bestall-hem-card-logo-wrap bestall-hem-card-logo-wrap--uber">
            <img src={uberEatsImg} alt="" className="bestall-hem-card-img" width={160} height={160} />
          </span>
          <span className="bestall-hem-card-label">Uber Eats</span>
          <div className="bestall-hem-card-actions">
            <a
              className="bestall-hem-btn bestall-hem-btn--uber"
              href={UBER_EATS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('bestall.viaWeb')}
            </a>
          </div>
        </div>

        <div className="bestall-hem-card bestall-hem-card--foodora">
          <span className="bestall-hem-card-logo-wrap bestall-hem-card-logo-wrap--foodora">
            <img src={foodoraImg} alt="" className="bestall-hem-card-img" width={160} height={160} />
          </span>
          <span className="bestall-hem-card-label">foodora</span>
          <div className="bestall-hem-card-actions">
            <a className="bestall-hem-btn" href={FOODORA_WEB} target="_blank" rel="noopener noreferrer">
              {t('bestall.viaWeb')}
            </a>
            <a
              className="bestall-hem-btn bestall-hem-btn--accent"
              href={FOODORA_APP}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('bestall.openApp')}
            </a>
          </div>
        </div>
      </div>

      <section className="bestall-hem-phone" aria-labelledby="bestall-phone-heading">
        <div className="bestall-hem-phone-inner">
          <h2 className="bestall-hem-phone-title" id="bestall-phone-heading">
            {t('bestall.phoneH2')}
          </h2>
          <ul className="bestall-hem-phone-list">
            <li>{t('bestall.phoneLi1')}</li>
            <li>{t('bestall.phoneLi2')}</li>
          </ul>
          <div className="bestall-hem-phone-actions">
            <a className="bestall-hem-phone-cta" href={`tel:${PHONE_TEL}`}>
              <span className="bestall-hem-phone-cta-label">{t('bestall.ring')}</span>
              <span className="bestall-hem-phone-cta-number">{PHONE_DISPLAY}</span>
            </a>
            <Link className="bestall-hem-phone-cta bestall-hem-phone-cta--contact" to="/kontakt">
              <span className="bestall-hem-phone-cta-label bestall-hem-phone-cta-label--on-dark">
                {t('bestall.contact')}
              </span>
              <span className="bestall-hem-phone-cta-sub">{t('bestall.sendMessage')}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
