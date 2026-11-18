import { useCallback, useEffect, useRef, useState } from 'react';
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

/** Varje plats i leken: förskjutning, skala, lutning och opacitet (0 = främst). */
const DECK = [
  { x: 0, y: 0, s: 1, r: 0, o: 1 },
  { x: 2, y: -9, s: 0.978, r: 1.2, o: 0.93 },
  { x: -3, y: -15, s: 0.96, r: -2, o: 0.91 },
  { x: 4, y: -21, s: 0.945, r: 2.6, o: 0.89 },
  { x: -5, y: -27, s: 0.93, r: -3.2, o: 0.87 },
  { x: 6, y: -33, s: 0.915, r: 4.2, o: 0.85 },
  { x: -8, y: -39, s: 0.9, r: -5, o: 0.83 },
];
const STEP_MS = 4800;
/** Samma längd som guest-card-to-back i guest-reviews.css. */
const FLIP_MS = 1150;

function deckStyle(pos, count) {
  const d = DECK[Math.min(pos, DECK.length - 1)];
  return {
    '--deck-transform': `translate(${d.x}px, ${d.y}px) scale(${d.s}) rotate(${d.r}deg)`,
    '--deck-delay': `${Math.min(pos, 4) * 40}ms`,
    '--deck-opacity': pos >= DECK.length ? 0 : d.o,
    zIndex: count - pos,
  };
}

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Gästomdömen som en kortlek: var femte sekund lyfts det främre kortet, glider
 * bakåt och läggs sist, medan de andra glider fram ett steg, i en slinga.
 * Stannar medan pekaren är över leken eller fokus är i den; ett klick vänder
 * direkt. Med reducerad rörelse står leken still tills man klickar.
 */
export default function GuestReviewCards() {
  const { t } = useLanguage();
  const count = REVIEWS.length;
  const [front, setFront] = useState(0);
  const [leaving, setLeaving] = useState(null);
  const [paused, setPaused] = useState(false);
  const frontRef = useRef(0);
  const busy = useRef(false);
  const timer = useRef(null);

  const flip = useCallback(() => {
    // Ett kort i taget: en vändning som avbryts mitt i blir ett hopp.
    if (busy.current || count < 2) return;
    const was = frontRef.current;
    frontRef.current = (was + 1) % count;
    setFront(frontRef.current);
    if (reducedMotion()) return;
    busy.current = true;
    setLeaving(was);
    timer.current = setTimeout(() => {
      busy.current = false;
      setLeaving(null);
    }, FLIP_MS);
  }, [count]);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (paused || count < 2 || reducedMotion()) return undefined;
    const id = setInterval(flip, STEP_MS);
    return () => clearInterval(id);
  }, [paused, flip, count]);

  return (
    <div
      className="guest-reviews"
      aria-label={`${count} ${t('guestReviews.aria')}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="guest-reviews-stack" onClick={flip}>
        {REVIEWS.map((review, index) => {
          const pos = (index - front + count) % count;
          const isFront = pos === 0;
          return (
            <blockquote
              key={review.id}
              className={`guest-reviews-card${isFront ? ' guest-reviews-card--featured' : ''}${
                leaving === index ? ' guest-reviews-card--leaving' : ''
              }`}
              style={deckStyle(pos, count)}
              aria-hidden={!isFront}
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
