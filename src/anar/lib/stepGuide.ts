import { glideTo } from './glide'

/**
 * Får ett flerstegsformulär att gå vidare av sig självt: när gästen fyllt i ett steg och varit stilla en liten stund rullar
 * sidan mjukt till nästa del. Används av cateringformuläret (catering/useGuidedScroll.ts) och bokningen
 * (kitBridge/bookingFlow.ts). Ingen React här: stegen, målen och vad som är "klart" ges av den som använder den.
 *
 * Händelsestyrt: bara steget gästen just ändrat något i får flytta sidan (`touch`). Det gör att sidan aldrig rycker iväg
 * för ett steg längre ner som råkar vara klart, och aldrig hoppar tillbaka när gästen går upp och ändrar något.
 *
 * - Varje steg går vidare högst en gång av sig självt (ändrar gästen antalet en gång till, rullar inte sidan igen).
 * - Rullar gästen själv (mushjul, finger, PageDown, PageUp, Home, End) efter sin ändring väntar sidan: gästen styr.
 * - Trycker eller klickar gästen på något annat efter sin ändring har hen gått vidare själv: sidan väntar (annars flyttas
 *   sidan under fingret, precis när gästen ska trycka på nästa sak).
 * - Med `movedSince` väntar sidan också om den flyttats mer än så många pixlar sedan ändringen, av vem det än var (gästen,
 *   kitet eller något annat som rullar): då har någon annan redan ordnat det.
 * - Fältet gästen skrev i lämnas (så att tangentbordet på en telefon stängs och nästa del syns hel), men bara om det
 *   fortfarande har fokus: har gästen gått vidare till ett annat fält rörs inte fokus.
 * - `advance` (en knapp, Enter) går vidare direkt, även om steget redan gått vidare en gång.
 * - Rullningen startar i nästa tick: sker den inne i en tangent- eller musapåverkan (Enter) skulle samma händelse räknas
 *   som att gästen avbryter den (glide.ts avbryter vid tangenttryck och tryck).
 */

export interface StepGuideOptions<S extends string> {
  /** Är steget klart just nu? Frågas när pausen är slut, inte när gästen gjorde sin ändring. */
  isDone: (step: S) => boolean
  /** Det sidan rullar till när `step` är klart; null när det inte finns i sidan (än). */
  resolve: (step: S) => HTMLElement | null
  /** Pausen (ms) efter gästens senaste ändring, när `touch` inte ger en egen. */
  delay: (step: S) => number
  /** Rulla inte om målet redan syns (en klistrad kolumn som Kalkylen). */
  skipIfInView?: (step: S) => boolean
  /** Vänta med att gå vidare medan detta är sant (gästen skriver fortfarande längre ner i steget). */
  hold?: (step: S) => boolean
  /** Gå inte vidare om sidan flyttats mer än så här många pixlar sedan gästens ändring. Av som standard. */
  movedSince?: number
}

export interface StepGuide<S extends string> {
  /** Gästen har ändrat något i steget: gå vidare när steget är klart och det varit stilla en stund. */
  touch: (step: S, delay?: number) => void
  /** Gå vidare nu, till det som kommer efter `step`. */
  advance: (step: S) => void
  /** Börjar lyssna på gästens egen rullning. Returnerar en funktion som slutar lyssna och avbryter all väntan. */
  start: () => () => void
}

/** Så ofta ett steg som hålls (gästen skriver) kontrolleras igen. */
export const RETRY_MS = 1500

export function createStepGuide<S extends string>(options: StepGuideOptions<S>): StepGuide<S> {
  const advanced = new Set<S>()
  const timers = new Map<S, number>()
  let lastManualScroll = 0
  let lastPress = 0

  function go(step: S, source: Element | null) {
    const target = options.resolve(step)
    if (!target) return
    advanced.add(step)
    // Lämna fältet gästen skrev i, men bara om hen är kvar i det: hos en som tabbar eller redan gått vidare får fokus vara där det är.
    const active = document.activeElement
    if (active && active === source && (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement)) active.blur()
    window.setTimeout(() => void glideTo(target, { skipIfInView: options.skipIfInView?.(step) ?? false }), 0)
  }

  function schedule(step: S, delay: number, touchedAt: number, source: Element | null, scrollAtTouch: number) {
    function attempt() {
      timers.delete(step)
      if (advanced.has(step) || !options.isDone(step)) return
      if (lastManualScroll > touchedAt || lastPress > touchedAt) return
      if (options.movedSince !== undefined && Math.abs(window.scrollY - scrollAtTouch) > options.movedSince) return
      if (typeof document !== 'undefined' && document.hidden) return
      if (options.hold?.(step)) {
        timers.set(step, window.setTimeout(attempt, RETRY_MS))
        return
      }
      go(step, source)
    }
    timers.set(step, window.setTimeout(attempt, delay))
  }

  return {
    touch(step, delay = options.delay(step)) {
      if (advanced.has(step)) return
      window.clearTimeout(timers.get(step))
      schedule(step, delay, Date.now(), document.activeElement, window.scrollY)
    },
    advance(step) {
      window.clearTimeout(timers.get(step))
      timers.delete(step)
      go(step, document.activeElement)
    },
    start() {
      const note = () => {
        lastManualScroll = Date.now()
      }
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'PageDown' || e.key === 'PageUp' || e.key === 'Home' || e.key === 'End') note()
      }
      const onPress = () => {
        lastPress = Date.now()
      }
      window.addEventListener('pointerdown', onPress, { capture: true, passive: true })
      window.addEventListener('wheel', note, { passive: true })
      window.addEventListener('touchmove', note, { passive: true })
      window.addEventListener('keydown', onKey)
      return () => {
        window.removeEventListener('pointerdown', onPress, true)
        window.removeEventListener('wheel', note)
        window.removeEventListener('touchmove', note)
        window.removeEventListener('keydown', onKey)
        for (const id of timers.values()) window.clearTimeout(id)
        timers.clear()
      }
    },
  }
}
