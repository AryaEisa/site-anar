/**
 * Bokningen går sektionsvis: när gästen är klar med en del rullar sidan mjukt till nästa.
 *
 *   Del 1 "Hur många och när?"  ->  del 2 "Välj tid"  ->  del 3 "Välj ert bord"  ->  bordsdelen (planen)
 *
 * - Del 1 -> 2: ett klick på ett datum (efter 0,65 s) eller på plus och minus för antal personer (efter 1,8 s, så att
 *   flera klick hinner göras). Ett datum är redan valt från början, så del 1 är alltid "klar".
 * - Del 2 -> 3: ett klick på en tid (efter 0,9 s). Del 3 ritas först när en tid är vald, och sidan rullar dit när den finns.
 *   Pausen är så lång för att gästen ofta trycker på ett bord direkt efter tiden: ett nytt tryck, eller att sidan flyttats
 *   mer än 24 px, avbryter den väntande rullningen, så sidan flyttas aldrig under fingret.
 * - Del 3 -> bordsdelen: ett klick på "Välj bord själv" rullar till planen. "Automatiskt vald" väljer ett bord (tableMode.ts)
 *   och kitet rullar själv vidare till "Bekräfta bord". Ett klick på en knapp rullar alltid, även en andra gång.
 *
 * Kitets egen rullning efter att ett bord valts (till "Bekräfta bord") och efter att bordet hållits (till "Dina uppgifter")
 * är orörd. Själva väntan och rullningen är lib/stepGuide.ts, densamma som cateringformuläret använder: bara steget gästen
 * just ändrat får flytta sidan, högst en gång, aldrig efter att gästen rullat själv.
 *
 * Delarna hittas på sitt nummer i rubriken (`.step-no`), inte på plats i listan, så att det står kvar om kitet lägger till
 * ett steg. Tas bort när kitet har en egen stegvis rullning.
 */
import { createStepGuide } from '../lib/stepGuide'
import { getTableMode } from './tableMode'

export type BookingStep = 'when' | 'time' | 'mode'

/** Pauser (ms) efter gästens senaste klick. */
export const BOOKING_DELAYS = { date: 650, party: 1800, time: 900 } as const

/** Har sidan flyttats mer än så här sedan gästens klick har någon annan redan ordnat det: rulla inte. */
export const MOVED_PX = 24

const form = (): HTMLFormElement | null => document.querySelector<HTMLFormElement>('form.booking')

/** Delen med ett visst nummer i rubriken (1 till 4). */
function stepNumbered(n: string): HTMLElement | null {
  for (const step of form()?.querySelectorAll<HTMLElement>(':scope > fieldset.booking-step') ?? []) {
    if (step.querySelector(':scope > legend .step-no')?.textContent?.trim() === n) return step
  }
  return null
}

/** Vart sidan rullar när `step` är klart. */
export function bookingTarget(step: BookingStep): HTMLElement | null {
  switch (step) {
    case 'when':
      return stepNumbered('2')
    case 'time':
      return stepNumbered('3')
    case 'mode': {
      // Bara "Välj bord själv" rullar: med "Automatiskt vald" rullar kitet till Bekräfta bord när bordet är valt.
      if (getTableMode() !== 'self') return null
      const next = form()?.querySelector('.plan-mode')?.nextElementSibling
      return next instanceof HTMLElement ? next : null
    }
  }
}

/** Är `step` klart just nu? */
export function bookingDone(step: BookingStep): boolean {
  switch (step) {
    case 'when':
      return form()?.querySelector('.date-tile.active') != null
    case 'time':
      return form()?.querySelector('.booking-times [aria-pressed="true"]') != null
    case 'mode':
      return getTableMode() !== null
  }
}

export interface BookingFlow {
  touch: (step: BookingStep, delay?: number) => void
  advance: (step: BookingStep) => void
  stop: () => void
}

/** Sätter igång rullningen mellan bokningens delar. Returnerar styrningen, och `stop` som stänger av allt. */
export function installBookingFlow(): BookingFlow {
  const guide = createStepGuide<BookingStep>({
    isDone: bookingDone,
    resolve: bookingTarget,
    delay: (step) => (step === 'time' ? BOOKING_DELAYS.time : step === 'when' ? BOOKING_DELAYS.party : 0),
    movedSince: MOVED_PX,
  })
  const stopGuide = typeof window === 'undefined' ? () => {} : guide.start()

  const onClick = (e: MouseEvent) => {
    const target = e.target instanceof Element ? e.target : null
    if (!target || !target.closest('form.booking')) return
    if (target.closest('.date-tile')) guide.touch('when', BOOKING_DELAYS.date)
    else if (target.closest('.party-btn')) guide.touch('when', BOOKING_DELAYS.party)
    else if (target.closest('.booking-times .filter-pill')) guide.touch('time', BOOKING_DELAYS.time)
  }
  if (typeof document !== 'undefined') document.addEventListener('click', onClick)

  return {
    touch: guide.touch,
    advance: guide.advance,
    stop: () => {
      if (typeof document !== 'undefined') document.removeEventListener('click', onClick)
      stopGuide()
    },
  }
}
