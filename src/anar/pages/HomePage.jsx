import { BookingFlow, useSite } from '@bookingsystemadvancedorg/site-kit';
import GuestReviewCards from '../components/GuestReviewCards';
import RestaurantMapSection from '../components/RestaurantMapSection';
import ReviewsPanel from '../components/ReviewsPanel';

/** Startsidan: bokning (kitets flöde) bredvid betyg och omdömen, sedan kartan. */
export default function HomePage() {
  const { config } = useSite();
  const canBook = Boolean(config.tenant.features.reservations);

  return (
    <div className="booking-reviews-stack">
      <section className="desk-split">
        <div className="desk-split-col desk-split-col--form">
          {canBook && (
            <div className="kit-panel">
              <BookingFlow />
            </div>
          )}
        </div>
        <div className="desk-split-col desk-split-col--reviews">
          <div className="reviews-column">
            <ReviewsPanel />
            <GuestReviewCards />
          </div>
        </div>
      </section>
      <RestaurantMapSection />
    </div>
  );
}
