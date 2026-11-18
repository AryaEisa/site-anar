import { Navigate, Route, Routes } from 'react-router-dom'
import {
  BookingFlow,
  BookingTermsPage,
  CateringFlow,
  CateringRequest,
  CookiePolicy,
  ManageBooking,
  OrderFlow,
  OrderStatus,
  PrivacyPolicy,
  useSite,
} from '@bookingsystemadvancedorg/site-kit'
import SiteLayout from './anar/layouts/SiteLayout'
import KitPage from './anar/layouts/KitPage'
import HomePage from './anar/pages/HomePage'
import MenyPage from './anar/pages/MenyPage'
import DrinkMenyPage from './anar/pages/DrinkMenyPage'
import DagensLunchPage from './anar/pages/DagensLunchPage'
import KolgrillPage from './anar/pages/KolgrillPage'
import HistoriaPage from './anar/pages/HistoriaPage'
import ParkeringPage from './anar/pages/ParkeringPage'
import KontaktPage from './anar/pages/KontaktPage'
import BestallHemPage from './anar/pages/BestallHemPage'

/**
 * Anars publika webbplats. Utseendet och sidorna (src/anar) är Anars egna;
 * flödena (boka, beställ, catering, juridik) kommer från
 * @bookingsystemadvancedorg/site-kit och visas i KitPage. Boka bord, Beställ
 * och Catering finns bara när restaurangens plan har dem; gästens sidor för
 * en gjord bokning/beställning/förfrågan (länkar i sms och mejl) finns alltid.
 */
function App() {
  const { config } = useSite()
  const { reservations, ordering, catering } = config.tenant.features
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="meny" element={<MenyPage />} />
        <Route path="drinkmeny" element={<DrinkMenyPage />} />
        <Route path="dagens-lunch" element={<DagensLunchPage />} />
        <Route path="kolgrill" element={<KolgrillPage />} />
        <Route path="historia" element={<HistoriaPage />} />
        <Route path="parkering" element={<ParkeringPage />} />
        <Route path="kontakt" element={<KontaktPage />} />
        <Route path="bestall-hem" element={<BestallHemPage />} />
        <Route element={<KitPage />}>
          {reservations && <Route path="boka-bord" element={<BookingFlow />} />}
          {reservations && <Route path="bokningsvillkor" element={<BookingTermsPage />} />}
          <Route path="bokning/:locationId/:reservationId" element={<ManageBooking />} />
          {ordering && <Route path="bestall" element={<OrderFlow />} />}
          <Route path="bestallning/:locationId/:orderId" element={<OrderStatus />} />
          {catering && <Route path="catering" element={<CateringFlow />} />}
          <Route path="catering/:locationId/:requestId" element={<CateringRequest />} />
          <Route path="integritetspolicy" element={<PrivacyPolicy />} />
          <Route path="cookies" element={<CookiePolicy />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
