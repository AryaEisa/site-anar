/**
 * Läsbar text i bokningens 2D-plan: bordsnummer och antal platser får en minsta storlek på skärmen, hur liten planen än ritas.
 *
 * Kitet ritar texten i planens egna enheter (meter): numret 0,3 och platserna 0,18. Planen skalas ner för att rymma hela
 * rummet, och på en telefon blir en meter 16 px: numret ca 5 px och platserna 3 px, omöjligt att läsa. Den här modulen mäter
 * hur många skärmpixlar en enhet är (`getScreenCTM`) och lägger värdet i CSS-variabeln `--plan-k` på SVG:n. plan-text.css
 * räknar sedan ut textstorleken som det största av "storleken i meter" och "minsta storlek på skärmen delat med --plan-k", så
 * att texten aldrig blir mindre än på en dator. Den mäts om när planen byter storlek (en annan skärmbredd, zoomknapparna).
 *
 * Tas bort när kitet själv ger planens text en läsbar storlek.
 */

const PLAN = '.floor-svg'

/** Skärmpixlar per enhet i planen, eller null när det inte går att mäta (inte ritad än). */
export function pixelsPerUnit(svg: SVGSVGElement): number | null {
  if (typeof svg.getScreenCTM !== 'function') return null
  const k = svg.getScreenCTM()?.a
  return typeof k === 'number' && Number.isFinite(k) && k > 0 ? k : null
}

/** Skriver skalan på SVG:n. Rör inte DOM:en när värdet är detsamma. Returnerar true när något ändrades. */
export function applyScale(svg: SVGSVGElement): boolean {
  const k = pixelsPerUnit(svg)
  if (k === null) return false
  const value = k.toFixed(2)
  if (svg.style.getPropertyValue('--plan-k') === value) return false
  svg.style.setProperty('--plan-k', value)
  return true
}

/** Sätter igång: mäter varje 2D-plan som ritas och när den byter storlek. Returnerar en funktion som stänger av det. */
export function installPlanText(): () => void {
  if (typeof window === 'undefined') return () => {}
  const watched = new WeakSet<Element>()
  const sizes = typeof ResizeObserver === 'function' ? new ResizeObserver((entries) => entries.forEach((e) => e.target instanceof SVGSVGElement && applyScale(e.target))) : null
  let frame = 0

  const scan = () => {
    frame = 0
    for (const svg of document.querySelectorAll<SVGSVGElement>(PLAN)) {
      // Kopian i förstoringsglaset (planLens.ts) har skalan med sig och är skalad av glaset: den mäts inte.
      if (svg.closest('.plan-lens')) continue
      applyScale(svg)
      if (!watched.has(svg)) {
        watched.add(svg)
        sizes?.observe(svg)
      }
    }
  }
  const observer = new MutationObserver(() => {
    if (!frame) frame = requestAnimationFrame(scan)
  })
  observer.observe(document.documentElement, { childList: true, subtree: true })
  window.addEventListener('resize', scan)
  scan()

  return () => {
    observer.disconnect()
    sizes?.disconnect()
    window.removeEventListener('resize', scan)
    if (frame) cancelAnimationFrame(frame)
  }
}
