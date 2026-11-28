/**
 * Ett tryck på ett bord som inte går att boka: en tydlig varning i stället för en vanlig notis.
 *
 * Kitet förklarar redan varför ("Bord 6 är redan bokat kl 21:30. Välj ett annat bord eller en annan tid.", "För litet bord
 * för 6. ...", "Bord 3 är spärrat ...") i en notis under planritningen (`p.notice.table-info`). Den här modulen:
 *
 * - märker notisen som en varning (`.plan-warning`, plan-warning.css: varningsfärg och en varningsikon),
 * - lägger till en rad sist, "Välj ett bord som lyser.", som kitets text inte alltid har med (ett spärrat bord eller ett
 *   som bara bokas via telefon säger inte vad man ska göra i stället),
 * - rullar fram varningen om den hamnat utanför skärmen (på en telefon ligger den under en hög planritning), men bara så
 *   mycket som behövs.
 *
 * Raden är riktig text i sidan, så kitets översättning tar den. Kitet byter notisens text genom att skriva över den, och då
 * försvinner raden: den läggs tillbaka. Notisen försvinner av sig själv när gästen väljer ett bord (kitet tar bort den).
 *
 * Tas bort när kitet själv gör varningen tydlig.
 */
import { glideTo } from '../lib/glide'

/** Singular och enkel: "Välj ett av borden som lyser." blev "Elige una de las mesas de Borden que brille" på spanska. */
export const WARNING_HINT = 'Välj ett bord som lyser.'

const NOTICE = 'p.table-info'
/** Kitets text i varje notis, för att se när den byts (ett nytt bord att förklara). */
const seenText = new WeakMap<Element, string>()

/** Texten kitet skrivit (utan vår rad). */
function kitText(notice: Element): string {
  return [...notice.childNodes]
    .filter((n) => !(n instanceof Element && n.classList.contains('plan-warning-hint')))
    .map((n) => n.textContent ?? '')
    .join('')
}

/**
 * Märker alla notiser och lägger till raden. Returnerar de notiser vars text är ny sedan sist (nya eller ändrade): de ska
 * visas för gästen. Säker att köra många gånger.
 */
export function decorateWarnings(root: ParentNode = document): HTMLElement[] {
  const fresh: HTMLElement[] = []
  for (const notice of root.querySelectorAll<HTMLElement>(NOTICE)) {
    notice.classList.add('plan-warning')
    if (!notice.querySelector(':scope > .plan-warning-hint')) {
      const hint = document.createElement('span')
      hint.className = 'plan-warning-hint'
      hint.textContent = WARNING_HINT
      notice.appendChild(hint)
    }
    const text = kitText(notice)
    if (seenText.get(notice) !== text) {
      seenText.set(notice, text)
      fresh.push(notice)
    }
  }
  return fresh
}

/** Sätter igång varningarna. Returnerar en funktion som stänger av dem. */
export function installTableWarning(): () => void {
  if (typeof window === 'undefined') return () => {}
  let frame = 0
  const run = () => {
    frame = 0
    const fresh = decorateWarnings()
    if (fresh.length > 0) void glideTo(fresh[0], { block: 'nearest', duration: 450 })
  }
  const observer = new MutationObserver(() => {
    if (!frame) frame = requestAnimationFrame(run)
  })
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true })
  run()
  return () => {
    observer.disconnect()
    if (frame) cancelAnimationFrame(frame)
  }
}
