import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { OfferCard, SkelCard, trackPage, useSite } from '@bookingsystemadvancedorg/site-kit';
import bgKebab from '../images/kebab.gif';
import bgMeny from '../images/granatapple.webp';
import bgKolgrill from '../images/kollgrill.webp';
import bgHistoria from '../images/aboutus/bakgrund_bild.png';
import bgParking from '../images/parking.jpg';
import bgKontakt from '../images/contact.png';
import bgBestall from '../images/delivery/delivery_background.jpg';
import DrinkMenyBackground from '../components/DrinkMenyBackground';
import DagensLunchBackground from '../components/DagensLunchBackground';
import Header from '../components/Header';
import LanguageSwitcher from '../components/LanguageSwitcher';
import OrderBar from '../components/OrderBar';
import Footer from '../components/Footer';
import MobilePreFooterNav from '../components/MobilePreFooterNav';
import Seo from '../components/Seo';

export default function SiteLayout() {
  const { pathname } = useLocation();
  const { config, location } = useSite();
  const marketing = config.tenant.features.marketing;
  // Besöksstatistik utan cookies, bara med marknadsföring i planen.
  useEffect(() => {
    if (marketing) trackPage(location.locationId, pathname);
  }, [marketing, location.locationId, pathname]);
  const isMeny = pathname === '/meny';
  const isDrinkMeny = pathname === '/drinkmeny';
  const isDagensLunch = pathname === '/dagens-lunch';
  const isKolgrill = pathname === '/kolgrill';
  const isHistoria = pathname === '/historia';
  const isParkering = pathname === '/parkering';
  const isKontakt = pathname === '/kontakt';
  const isBestall = pathname === '/bestall-hem';
  const bgSrc = isBestall
    ? bgBestall
    : isKontakt
      ? bgKontakt
      : isParkering
        ? bgParking
        : isHistoria
          ? bgHistoria
          : isKolgrill
            ? bgKolgrill
            : isMeny
              ? bgMeny
              : bgKebab;

  const landingClass = [
    'landing',
    isMeny && 'landing--meny',
    isDrinkMeny && 'landing--drinkmeny',
    isDagensLunch && 'landing--dagenslunch',
    isKolgrill && 'landing--kolgrill',
    isHistoria && 'landing--historia',
    isParkering && 'landing--parkering',
    isKontakt && 'landing--kontakt',
    isBestall && 'landing--bestall',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={landingClass}>
      <Seo />
      {isDrinkMeny ? (
        <DrinkMenyBackground />
      ) : isDagensLunch ? (
        <DagensLunchBackground />
      ) : (
        <img
          className="landing-bg"
          key={bgSrc}
          src={bgSrc}
          alt=""
          decoding="async"
          fetchPriority="high"
          aria-hidden="true"
        />
      )}
      <div className="landing-scrim" aria-hidden="true" />

      <div className="landing-content">
        <Header />
        <LanguageSwitcher />
        <OrderBar />
        <Suspense fallback={<SkelCard label="Hämtar sidan" />}>
          <Outlet />
        </Suspense>
        <MobilePreFooterNav />
        {marketing && <OfferCard key={location.locationId} />}
        <Footer />
      </div>
    </div>
  );
}
