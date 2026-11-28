import { afterEach, describe, expect, it, vi } from 'vitest'
import { applyScale, installPlanText, pixelsPerUnit } from './planText'

const SVG_NS = 'http://www.w3.org/2000/svg'

/** En SVG som mäter `k` skärmpixlar per enhet (jsdom har ingen getScreenCTM, så den ersätts). */
function plan(k: number | null, host: Element = document.body): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('class', 'floor-svg')
  Object.defineProperty(svg, 'getScreenCTM', { value: () => (k === null ? null : { a: k }), configurable: true })
  host.appendChild(svg)
  return svg
}

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('measuring the plan', () => {
  it('gives the screen pixels per unit', () => {
    expect(pixelsPerUnit(plan(16.04))).toBe(16.04)
  })

  it('gives nothing while the plan cannot be measured (not drawn yet) or when the browser cannot measure', () => {
    expect(pixelsPerUnit(plan(null))).toBeNull()
    expect(pixelsPerUnit(plan(0))).toBeNull()
    const bare = document.createElementNS(SVG_NS, 'svg')
    expect(pixelsPerUnit(bare)).toBeNull() // jsdom: ingen getScreenCTM
  })
})

describe('writing the scale', () => {
  it('puts it in --plan-k on the plan, which plan-text.css sizes the text from', () => {
    const svg = plan(16.04)
    expect(applyScale(svg)).toBe(true)
    expect(svg.style.getPropertyValue('--plan-k')).toBe('16.04')
  })

  it('does not touch the page when the value is the same', () => {
    const svg = plan(45.12)
    applyScale(svg)
    expect(applyScale(svg)).toBe(false)
    expect(svg.style.getPropertyValue('--plan-k')).toBe('45.12')
  })

  it('writes a new value when the plan changes size (another screen width, the zoom buttons)', () => {
    const svg = plan(16.04)
    applyScale(svg)
    Object.defineProperty(svg, 'getScreenCTM', { value: () => ({ a: 32.09 }), configurable: true })
    expect(applyScale(svg)).toBe(true)
    expect(svg.style.getPropertyValue('--plan-k')).toBe('32.09')
  })

  it('leaves a plan that cannot be measured alone', () => {
    const svg = plan(null)
    expect(applyScale(svg)).toBe(false)
    expect(svg.style.getPropertyValue('--plan-k')).toBe('')
  })
})

describe('on the page', () => {
  let stop: () => void = () => {}
  afterEach(() => {
    stop()
    stop = () => {}
  })

  it('measures a plan that is already there and one that is drawn later', async () => {
    const first = plan(16.04)
    stop = installPlanText()
    expect(first.style.getPropertyValue('--plan-k')).toBe('16.04')

    const later = plan(45.12)
    await new Promise((r) => setTimeout(r, 60))
    expect(later.style.getPropertyValue('--plan-k')).toBe('45.12')
  })

  it('does not measure the copy of the plan in the magnifying lens (the lens scales it)', () => {
    const lens = document.createElement('div')
    lens.className = 'plan-lens'
    document.body.appendChild(lens)
    const copy = plan(35.3, lens)
    stop = installPlanText()
    expect(copy.style.getPropertyValue('--plan-k')).toBe('')
  })

  it('measures again when the window changes size', () => {
    const svg = plan(16.04)
    stop = installPlanText()
    Object.defineProperty(svg, 'getScreenCTM', { value: () => ({ a: 24.5 }), configurable: true })
    window.dispatchEvent(new Event('resize'))
    expect(svg.style.getPropertyValue('--plan-k')).toBe('24.50')
  })

  it('stops listening when it is switched off', () => {
    const svg = plan(16.04)
    stop = installPlanText()
    stop()
    Object.defineProperty(svg, 'getScreenCTM', { value: () => ({ a: 99 }), configurable: true })
    window.dispatchEvent(new Event('resize'))
    expect(svg.style.getPropertyValue('--plan-k')).toBe('16.04')
    stop = () => {}
  })
})
