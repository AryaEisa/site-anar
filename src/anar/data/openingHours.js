/** Veckoschema per avdelning (visas under Öppettider). dayKey översätts i UI. */

const RESTAURANT_AND_TAKEAWAY_ROWS = [
  { dayKey: 'saturday', hours: '12-22' },
  { dayKey: 'sunday', closed: true },
  { dayKey: 'monday', closed: true },
  { dayKey: 'tuesday', hours: '11-21' },
  { dayKey: 'wednesday', hours: '11-21' },
  { dayKey: 'thursday', hours: '11-21' },
  { dayKey: 'friday', hours: '11-22' },
];

export const OPENING_HOURS_SECTIONS = [
  {
    id: 'restaurant',
    rows: RESTAURANT_AND_TAKEAWAY_ROWS,
  },
  {
    id: 'avhamtning',
    rows: RESTAURANT_AND_TAKEAWAY_ROWS,
  },
  {
    id: 'lunch',
    rows: [
      { dayKey: 'saturday', hours: '12-15' },
      { dayKey: 'sunday', closed: true },
      { dayKey: 'monday', closed: true },
      { dayKey: 'tuesday', hours: '11-14:30' },
      { dayKey: 'wednesday', hours: '11-14:30' },
      { dayKey: 'thursday', hours: '11-14:30' },
      { dayKey: 'friday', hours: '11-14:30' },
    ],
  },
  {
    id: 'middag',
    rows: [
      { dayKey: 'saturday', hours: '17-22' },
      { dayKey: 'sunday', closed: true },
      { dayKey: 'monday', closed: true },
      { dayKey: 'tuesday', hours: '17-21' },
      { dayKey: 'wednesday', hours: '17-21' },
      { dayKey: 'thursday', hours: '17-21' },
      { dayKey: 'friday', hours: '17-22' },
    ],
  },
];
