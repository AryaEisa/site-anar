/**
 * Öppettiderna som rader per veckodag. Allt kommer från platsens veckotider i
 * Booqy (businessHours, upp till flera pass per dag). Lunch och middag är
 * samma pass delade vid LUNCH_ENDS: det som ligger före är lunch, det som
 * ligger från är middag. Anger restaurangen "11:00-14:30" och "17:00-21:00"
 * som två pass blir det lunch 11-14:30 och middag 17-21; ett enda långt pass
 * ("12:00-23:00") delas i lunch 12-16 och middag 16-23. dayKey översätts i UI.
 */

/** Anars ordning på veckan i listorna (lördag först). */
export const DAY_ORDER = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

/** Lunch tar slut och middag börjar här. */
export const LUNCH_ENDS = '16:00';

const minutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + (m || 0);
};

/** "11:00" -> "11", "14:30" blir kvar, som i Anars egna tider. */
export const shortTime = (time) => time.replace(/:00$/, '');

const byOpening = (a, b) => minutes(a.opensAt) - minutes(b.opensAt);

/** Dagens pass delade i lunch (före LUNCH_ENDS) och middag (från LUNCH_ENDS). */
export function splitByMeal(ranges = []) {
  const cutoff = minutes(LUNCH_ENDS);
  const lunch = [];
  const dinner = [];
  for (const range of [...ranges].sort(byOpening)) {
    const open = minutes(range.opensAt);
    let close = minutes(range.closesAt);
    if (close <= open) close += 24 * 60; // pass över midnatt, t.ex. 18:00-02:00
    if (close <= cutoff) lunch.push(range);
    else if (open >= cutoff) dinner.push(range);
    else {
      lunch.push({ opensAt: range.opensAt, closesAt: LUNCH_ENDS });
      dinner.push({ opensAt: LUNCH_ENDS, closesAt: range.closesAt });
    }
  }
  return { lunch, dinner };
}

/** En rad per dag i Anars ordning; "closed" när dagen saknar pass. */
function rowsFor(businessHours, pick) {
  return DAY_ORDER.map((dayKey) => {
    const ranges = pick(businessHours?.[dayKey] ?? []);
    return ranges.length
      ? { dayKey, hours: ranges.map((r) => `${shortTime(r.opensAt)}-${shortTime(r.closesAt)}`).join(', ') }
      : { dayKey, closed: true };
  });
}

export const restaurantRows = (businessHours) => rowsFor(businessHours, (ranges) => [...ranges].sort(byOpening));
export const lunchRows = (businessHours) => rowsFor(businessHours, (ranges) => splitByMeal(ranges).lunch);
export const dinnerRows = (businessHours) => rowsFor(businessHours, (ranges) => splitByMeal(ranges).dinner);

/** Finns det någon dag med tider? Annars visas inte listan alls (t.ex. lunch på ett kvällsställe). */
export const hasHours = (rows) => rows.some((row) => !row.closed);
