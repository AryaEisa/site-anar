import { glideTo, prefersReducedMotion } from './glide'

/**
 * TILLFÄLLIG BRYGGA för site-kit 0.3.0 (README.md i den här mappen).
 *
 * site-kit dev har bordsvalets klickeffekt och den mjuka rullningen inbyggt
 * (pickEffect.ts, glide.ts, data-table-id på borden). Tills sajten kör en
 * site-kit-version med det ger den här modulen samma upplevelse utan att
 * ändra kitet:
 *   - klick på ett bord eller en bordsknapp: bordet poppar, en ring sprider
 *     sig ut och knappen lyser (0,5 s);
 *   - kitets rullning till Bekräfta bord väntar tills effekten spelat klart
 *     och glider sedan mjukt (i stället för ett hopp), fokus till knappen;
 *   - när bordet hålls glider sidan till stegraden och fokus går till steg 4;
 *   - lediga bord andas i takt;
 *   - instruktionstexten säger "lyser" i stället för "grått/rött".
 * Allt stängs av av sig självt när kitet har det (borden har data-table-id).
 */

const EFFECT_MS = 500
const OLD_HINT = 'Tryck på ett grått bord för att välja det. Röda bord är upptagna - tryck på dem så berättar vi varför.'
const NEW_HINT = 'Borden som lyser går att boka för ert sällskap. Tryck på ett mörkt bord så berättar vi varför det inte går.'

/** Kitet gör det själv (site-kit med pickEffect.ts). */
const kitHasIt = () => Boolean(document.querySelector('[data-table-id]'))

function syncBreathing() {
  if (typeof document.getAnimations !== 'function') return
  for (const a of document.getAnimations()) {
    if ((a as CSSAnimation).animationName?.startsWith('plan-breathe') && a.startTime !== 0) a.startTime = 0
  }
}

/** Ringen i bordet: en tom ram i 3D, en kopia av bordets kontur i 2D. Skapas en gång. */
function rippleOf(table: Element): Element | null {
  const existing = table.querySelector(':scope > .plan-ripple')
  if (existing) return existing
  if (table.classList.contains('f3d-table')) {
    const span = document.createElement('span')
    span.className = 'plan-ripple'
    span.setAttribute('aria-hidden', 'true')
    table.prepend(span)
    return span
  }
  const shape = table.querySelector('.floor-svg-table')
  if (!shape) return null
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  g.setAttribute('class', 'plan-ripple')
  g.setAttribute('aria-hidden', 'true')
  const copy = shape.cloneNode(false) as Element
  copy.setAttribute('class', 'floor-svg-ripple')
  g.append(copy)
  shape.after(g)
  return g
}

function play(tables: Element[], chip: HTMLElement | null) {
  if (prefersReducedMotion()) return
  const timing = { duration: EFFECT_MS, easing: 'cubic-bezier(.2,.8,.2,1)' }
  for (const table of tables) {
    const body = table.querySelector('.f3d-table-body') ?? table
    body.animate?.([{ scale: '1' }, { scale: '1.16', offset: 0.35 }, { scale: '0.96', offset: 0.7 }, { scale: '1' }], timing)
    rippleOf(table)?.animate?.([{ opacity: 0.95, scale: '1' }, { opacity: 0, scale: '2' }], { duration: EFFECT_MS, easing: 'ease-out' })
  }
  if (chip?.animate) {
    const ring = getComputedStyle(chip).getPropertyValue('--seat-ring').trim() || '#e8c98a'
    chip.animate(
      [
        { scale: '1', boxShadow: `0 0 0 0 ${ring}` },
        { scale: '1.06', boxShadow: `0 0 0 6px color-mix(in srgb, ${ring} 55%, transparent)`, offset: 0.35 },
        { scale: '1', boxShadow: '0 0 0 12px transparent' },
      ],
      timing,
    )
  }
}

/** Ett klick som valde ett bord (på planen eller i listan): spela effekten. */
function onClick(e: MouseEvent) {
  if (kitHasIt()) return
  const target = e.target as Element | null
  const onPlan = target?.closest('.f3d-pick, .floor-svg-pick')
  const onChip = target?.closest('.booking-table-list .filter-pill')
  if (!onPlan && !onChip) return
  const step = (onPlan ?? onChip)!.closest('.booking-step')
  // Kitet har redan ritat om (klick i React uppdateras direkt): de valda borden är markerade.
  const selected = [...(step?.querySelectorAll('.f3d-table.is-selected, .floor-svg-pick:has(.floor-svg-table.is-selected)') ?? [])]
  if (selected.length === 0) return
  play(selected, step?.querySelector<HTMLElement>('.booking-table-list .filter-pill.active') ?? null)
  requestAnimationFrame(syncBreathing)
}

/** Kitets egna rullningar i bokningen: vänta på effekten och glid i stället för att hoppa. Sant om den tog hand om rullningen. */
function glideInstead(el: Element): boolean {
  if (kitHasIt() || !(el instanceof HTMLElement)) return false
  if (el.classList.contains('booking-confirm-tables')) {
    window.setTimeout(() => {
      void glideTo(el, { block: 'nearest' }).then(() =>
        el.querySelector<HTMLButtonElement>('.btn-primary')?.focus({ preventScroll: true }),
      )
    }, prefersReducedMotion() ? 0 : EFFECT_MS)
    return true
  }
  if (el.classList.contains('page-head') && el.closest('main')?.querySelector('form.booking')) {
    void glideTo(el, { block: 'start' }).then(() => {
      // Steg 4 (Dina uppgifter): fokus till rubriken.
      const legend = [...document.querySelectorAll<HTMLElement>('form.booking .booking-step > legend')].find((l) =>
        l.textContent?.includes('Dina uppgifter'),
      )
      if (legend) {
        legend.tabIndex = -1
        legend.focus({ preventScroll: true })
      }
    })
    return true
  }
  return false
}

function patchScroll() {
  const original = Element.prototype.scrollIntoView
  Element.prototype.scrollIntoView = function (this: Element, arg?: boolean | ScrollIntoViewOptions) {
    if (glideInstead(this)) return
    return original.call(this, arg as ScrollIntoViewOptions)
  }
}

/** Instruktionen i steg 3 beskriver de nya färgerna. */
function fixHint(root: ParentNode) {
  for (const p of root.querySelectorAll('.booking-step > p.cell-muted')) {
    if (p.textContent === OLD_HINT) p.textContent = NEW_HINT
  }
}

let installed = false

export function installTablePickerBridge(): void {
  if (installed || typeof window === 'undefined') return
  installed = true
  document.addEventListener('click', onClick)
  patchScroll()
  new MutationObserver(() => {
    if (kitHasIt()) return
    fixHint(document)
    syncBreathing()
  }).observe(document.documentElement, { childList: true, subtree: true })
}
