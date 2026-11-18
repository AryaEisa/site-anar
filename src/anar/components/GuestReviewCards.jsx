import { useLanguage } from '../i18n/LanguageContext';

const REVIEWS = [
  {
    id: '2',
    name: 'laleh kafashi',
    meta: 'för 4 månader sedan',
    text: 'Fantastisk atmosfär, jättegod mat och väldigt trevlig personal! En riktigt fin upplevelse. Rekommenderas varmt.',
    stars: 5,
  },
  {
    id: '3',
    name: 'Ingela Lindahl',
    meta: '200-300 kr · för 3 månader sedan',
    text: 'Mycket vällagat och gott i trevlig miljö.',
    stars: 5,
  },
  {
    id: '4',
    name: 'Marcus V.',
    meta: 'för 5 månader sedan',
    text: 'Autentiska smaker och generösa portioner. Perfekt för en middag med familjen.',
    stars: 5,
  },
  {
    id: '5',
    name: 'Sofia K.',
    meta: '100-200 kr · för 1 månad sedan',
    text: 'Lugn stämning och väldigt god saffransrisotto. Personalen tog hand om oss från start.',
    stars: 5,
  },
  {
    id: '6',
    name: 'Jonas P.',
    meta: 'för 2 månader sedan',
    text: 'Bra vegetariska alternativ och snabb service trots fullt på helgkväll.',
    stars: 5,
  },
  {
    id: '7',
    name: 'Elin R.',
    meta: 'för 3 veckor sedan',
    text: 'Fint ställe nära sjukhuset - vi åt lunch och blev positivt överraskade av kvaliteten.',
    stars: 5,
  },
  {
    id: 'ann-britt',
    name: 'Ann-Britt Fagertoft',
    meta: 'Annat · 200-300 kr · för 2 månader sedan',
    text: 'Mycket trevligt bemötande. Vi var 5 personer i sällskapet och alla var nöjda med både mat och service.',
    stars: 5,
  },
];

function initials(name) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function StarRow({ count }) {
  return (
    <div className="guest-reviews-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? 'guest-reviews-star guest-reviews-star--on' : 'guest-reviews-star'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function GuestReviewCards() {
  const { t } = useLanguage();
  const count = REVIEWS.length;

  return (
    <div className="guest-reviews" aria-label={`${count} ${t('guestReviews.aria')}`}>
      <div className="guest-reviews-stack">
        {REVIEWS.map((review, index) => {
          const isFront = index === count - 1;
          return (
            <blockquote
              key={review.id}
              className={`guest-reviews-card${isFront ? ' guest-reviews-card--featured' : ''}`}
            >
              <div className="guest-reviews-head">
                <span className="guest-reviews-avatar" aria-hidden="true">
                  {initials(review.name)}
                </span>
                <div>
                  <cite className="guest-reviews-name">{review.name}</cite>
                  <p className="guest-reviews-meta">{review.meta}</p>
                </div>
              </div>
              <StarRow count={review.stars} />
              <p className="guest-reviews-quote">“{review.text}”</p>
            </blockquote>
          );
        })}
      </div>
    </div>
  );
}
