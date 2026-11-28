import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { glideTo } from '../lib/glide'
import { BOOKING_DELAYS, bookingDone, bookingTarget, installBookingFlow } from './bookingFlow'
import type { BookingFlow } from './bookingFlow'
import { resetTableMode, setTableMode } from './tableMode'

vi.mock('../lib/glide', () => ({ glideTo: vi.fn(async () => true) }))
const glide = vi.mocked(glideTo)

/** Kitets bokning: rubrikerna 1 till 3 (3 först när en tid är vald), datum, antal personer, tider. */
function booking(opts: { time?: boolean; step3?: boolean } = {}): HTMLFormElement {
  const form = document.createElement('form')
  form.className = 'booking'
  form.innerHTML = `
    <fieldset class="booking-step"><legend><span class="step-no">1</span>Hur många och när?</legend>
      <div class="party"><button type="button" class="party-btn" aria-label="En person till">+</button></div>
      <div class="booking-dates">
        <button type="button" class="date-tile active" aria-pressed="true">Idag</button>
        <button type="button" class="date-tile" aria-pressed="false">Fre</button>
      </div></fieldset>
    <fieldset class="booking-step"><legend><span class="step-no">2</span>Välj tid</legend>
      <div class="booking-times" role="group" aria-label="Välj tid">
        <button type="button" class="filter-pill" aria-pressed="${Boolean(opts.time)}">18:00</button>
        <button type="button" class="filter-pill" aria-pressed="false">18:30</button>
      </div></fieldset>
    ${
      opts.step3
        ? `<fieldset class="booking-step"><legend><span class="step-no">3</span>Välj ert bord</legend>
      <div class="plan-mode"></div><p class="cell-muted">Intro</p><div class="booking-table-list"></div></fieldset>`
        : ''
    }`
  document.body.appendChild(form)
  return form
}

const press = (el: Element) => el.dispatchEvent(new MouseEvent('click', { bubbles: true }))
const wait = (ms: number) => {
  vi.advanceTimersByTime(ms)
  vi.advanceTimersByTime(1) // rullningen startar i nästa tick
}

let flow: BookingFlow | null = null
beforeEach(() => {
  vi.useFakeTimers()
  glide.mockClear()
  resetTableMode()
})
afterEach(() => {
  flow?.stop()
  flow = null
  vi.useRealTimers()
  document.body.innerHTML = ''
})

describe('where the page rolls', () => {
  it('finds the parts by the number in their heading', () => {
    const form = booking({ step3: true })
    const fieldsets = form.querySelectorAll('fieldset')
    expect(bookingTarget('when')).toBe(fieldsets[1])
    expect(bookingTarget('time')).toBe(fieldsets[2])
  })

  it('has no part 3 to roll to before a time is chosen', () => {
    booking()
    expect(bookingTarget('time')).toBeNull()
  })

  it('rolls to the plan after "Välj bord själv" and nowhere after "Automatiskt vald"', () => {
    const form = booking({ step3: true })
    setTableMode('self')
    expect(bookingTarget('mode')).toBe(form.querySelector('.plan-mode')!.nextElementSibling)
    setTableMode('any')
    expect(bookingTarget('mode')).toBeNull() // kitet rullar själv till Bekräfta bord
    setTableMode(null)
    expect(bookingTarget('mode')).toBeNull()
  })
})

describe('what is done', () => {
  it('part 1 is done from the start (a date is chosen), part 2 when a time is chosen', () => {
    booking()
    expect(bookingDone('when')).toBe(true)
    expect(bookingDone('time')).toBe(false)
    document.body.innerHTML = ''
    booking({ time: true })
    expect(bookingDone('time')).toBe(true)
  })

  it('the table choice is done once the guest has chosen', () => {
    booking({ step3: true })
    expect(bookingDone('mode')).toBe(false)
    setTableMode('self')
    expect(bookingDone('mode')).toBe(true)
  })
})

describe('rolls on by itself', () => {
  it('from part 1 to part 2 shortly after a date is clicked', () => {
    const form = booking()
    flow = installBookingFlow()
    press(form.querySelectorAll('.date-tile')[1])
    wait(BOOKING_DELAYS.date - 1)
    expect(glide).not.toHaveBeenCalled()
    wait(2)
    expect(glide).toHaveBeenCalledOnce()
    expect(glide.mock.calls[0][0]).toBe(form.querySelectorAll('fieldset')[1])
  })

  it('from part 1 to part 2 after the number of people, once the guest has stopped clicking', () => {
    const form = booking()
    flow = installBookingFlow()
    const plus = form.querySelector('.party-btn')!
    press(plus)
    wait(1000)
    press(plus) // ett klick till: pausen börjar om
    wait(1000)
    expect(glide).not.toHaveBeenCalled()
    wait(BOOKING_DELAYS.party)
    expect(glide).toHaveBeenCalledOnce()
    expect(glide.mock.calls[0][0]).toBe(form.querySelectorAll('fieldset')[1])
  })

  it('from part 2 to part 3 shortly after a time is clicked, when part 3 has been drawn', () => {
    const form = booking({ step3: true })
    flow = installBookingFlow()
    const time = form.querySelector('.booking-times .filter-pill')!
    time.setAttribute('aria-pressed', 'true') // kitet markerar tiden som vald
    press(time)
    wait(BOOKING_DELAYS.time)
    expect(glide).toHaveBeenCalledOnce()
    expect(glide.mock.calls[0][0]).toBe(form.querySelectorAll('fieldset')[2])
  })

  it('only once per part: another date later does not roll the page again', () => {
    const form = booking()
    flow = installBookingFlow()
    press(form.querySelectorAll('.date-tile')[1])
    wait(BOOKING_DELAYS.date)
    press(form.querySelectorAll('.date-tile')[0])
    wait(BOOKING_DELAYS.date * 3)
    expect(glide).toHaveBeenCalledOnce()
  })

  it('does not roll when the guest scrolls by themselves after the click', () => {
    const form = booking()
    flow = installBookingFlow()
    press(form.querySelectorAll('.date-tile')[1])
    wait(200)
    window.dispatchEvent(new Event('wheel'))
    wait(BOOKING_DELAYS.date * 2)
    expect(glide).not.toHaveBeenCalled()
  })

  it('stays where it is when the guest clicks something else before the page rolls (a table right after the time)', () => {
    const form = booking({ step3: true })
    flow = installBookingFlow()
    const time = form.querySelector('.booking-times .filter-pill')!
    time.setAttribute('aria-pressed', 'true')
    press(time)
    wait(300)
    window.dispatchEvent(new Event('pointerdown')) // gästen trycker på ett bord
    wait(BOOKING_DELAYS.time * 2)
    expect(glide).not.toHaveBeenCalled()
  })

  it('stays where it is when the page has moved by itself since the click (the kit or the guest scrolled)', () => {
    const form = booking({ step3: true })
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true, writable: true })
    flow = installBookingFlow()
    const time = form.querySelector('.booking-times .filter-pill')!
    time.setAttribute('aria-pressed', 'true')
    press(time)
    wait(300)
    Object.defineProperty(window, 'scrollY', { value: 400, configurable: true, writable: true })
    wait(BOOKING_DELAYS.time * 2)
    expect(glide).not.toHaveBeenCalled()
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true, writable: true })
  })

  it('still rolls when the page has moved only a little (the browser adjusting the scroll position)', () => {
    const form = booking({ step3: true })
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true, writable: true })
    flow = installBookingFlow()
    const time = form.querySelector('.booking-times .filter-pill')!
    time.setAttribute('aria-pressed', 'true')
    press(time)
    Object.defineProperty(window, 'scrollY', { value: 110, configurable: true, writable: true })
    wait(BOOKING_DELAYS.time)
    expect(glide).toHaveBeenCalledOnce()
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true, writable: true })
  })

  it('ignores clicks outside the booking', () => {
    booking()
    const stray = document.createElement('button')
    stray.className = 'date-tile'
    document.body.appendChild(stray)
    flow = installBookingFlow()
    press(stray)
    wait(5000)
    expect(glide).not.toHaveBeenCalled()
  })
})

describe('the table choice buttons', () => {
  it('roll to the plan every time "Välj bord själv" is chosen, also the second time', () => {
    const form = booking({ step3: true })
    flow = installBookingFlow()
    setTableMode('self')
    flow.advance('mode')
    wait(0)
    expect(glide).toHaveBeenCalledOnce()
    expect(glide.mock.calls[0][0]).toBe(form.querySelector('.plan-mode')!.nextElementSibling)
    flow.advance('mode')
    wait(0)
    expect(glide).toHaveBeenCalledTimes(2)
  })

  it('do not roll after "Automatiskt vald" (the kit rolls to Bekräfta bord)', () => {
    booking({ step3: true })
    flow = installBookingFlow()
    setTableMode('any')
    flow.advance('mode')
    wait(0)
    expect(glide).not.toHaveBeenCalled()
  })
})
