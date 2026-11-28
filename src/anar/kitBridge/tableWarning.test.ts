import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { glideTo } from '../lib/glide'
import { WARNING_HINT, decorateWarnings, installTableWarning } from './tableWarning'

vi.mock('../lib/glide', () => ({ glideTo: vi.fn(async () => true) }))
const glide = vi.mocked(glideTo)

/** Kitets notis under planritningen när gästen tryckt på ett bord som inte går att boka. */
function notice(text: string): HTMLParagraphElement {
  const p = document.createElement('p')
  p.className = 'notice table-info'
  p.setAttribute('role', 'status')
  p.textContent = text
  document.body.appendChild(p)
  return p
}

beforeEach(() => glide.mockClear())
afterEach(() => {
  document.body.innerHTML = ''
})

describe('the warning', () => {
  it('turns the kit notice into a warning and adds what to do instead, once', () => {
    const p = notice('Bord 6 är redan bokat kl 21:30. Välj ett annat bord eller en annan tid.')
    decorateWarnings()
    decorateWarnings()

    expect(p.classList.contains('plan-warning')).toBe(true)
    expect(p.querySelectorAll('.plan-warning-hint')).toHaveLength(1)
    expect(p.querySelector('.plan-warning-hint')?.textContent).toBe(WARNING_HINT)
    // Kitets förklaring står kvar som den är.
    expect(p.textContent).toContain('Bord 6 är redan bokat kl 21:30.')
    expect(p.getAttribute('role')).toBe('status')
  })

  it('tells the guest to choose a table that glows', () => {
    expect(WARNING_HINT).toBe('Välj ett bord som lyser.')
  })

  it('reports a notice only when its text is new', () => {
    const p = notice('Bord 6 är redan bokat.')
    expect(decorateWarnings()).toEqual([p])
    expect(decorateWarnings()).toEqual([]) // samma text: inget nytt att visa

    // Kitet skriver över texten med en ny förklaring (och vår rad försvinner med den)
    p.textContent = 'För litet bord för 6. Bord 1 tar 2 personer.'
    expect(p.querySelector('.plan-warning-hint')).toBeNull()
    expect(decorateWarnings()).toEqual([p])
    expect(p.querySelector('.plan-warning-hint')?.textContent).toBe(WARNING_HINT) // tillbaka
  })

  it('leaves other notices alone', () => {
    const other = document.createElement('p')
    other.className = 'notice'
    other.textContent = 'Något annat'
    document.body.appendChild(other)
    decorateWarnings()
    expect(other.classList.contains('plan-warning')).toBe(false)
    expect(other.querySelector('.plan-warning-hint')).toBeNull()
  })
})

describe('showing the warning', () => {
  let stop: () => void = () => {}
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'setTimeout', 'clearTimeout'] })
  })
  afterEach(() => {
    stop()
    stop = () => {}
    vi.useRealTimers()
  })

  it('scrolls to a new warning, only as far as needed, and not again for the same text', async () => {
    stop = installTableWarning()
    notice('Bord 6 är redan bokat.')
    await vi.advanceTimersByTimeAsync(50)
    expect(glide).toHaveBeenCalledOnce()
    expect(glide.mock.calls[0][1]).toMatchObject({ block: 'nearest' })

    // vår egen rad som läggs till får inte ge en ny rullning
    await vi.advanceTimersByTimeAsync(200)
    expect(glide).toHaveBeenCalledOnce()
  })

  it('scrolls again when the kit explains another table', async () => {
    stop = installTableWarning()
    const p = notice('Bord 6 är redan bokat.')
    await vi.advanceTimersByTimeAsync(50)
    p.textContent = 'Bord 7 är spärrat.'
    await vi.advanceTimersByTimeAsync(50)
    expect(glide).toHaveBeenCalledTimes(2)
  })
})
