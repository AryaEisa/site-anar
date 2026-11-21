import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { WithSite, siteConfig } from '@bookingsystemadvancedorg/site-kit/testing'
import OpeningHoursContent from './OpeningHoursContent'

type Hours = Record<string, { opensAt: string; closesAt: string }[]>

const split: Hours = {
  monday: [{ opensAt: '11:00', closesAt: '14:00' }, { opensAt: '17:00', closesAt: '22:00' }],
  tuesday: [{ opensAt: '11:00', closesAt: '14:30' }, { opensAt: '17:00', closesAt: '21:00' }],
  saturday: [{ opensAt: '12:00', closesAt: '23:00' }],
}

function renderHours(businessHours: Hours) {
  const cfg = siteConfig()
  cfg.locations[0] = { ...cfg.locations[0], businessHours } as (typeof cfg.locations)[0]
  return render(
    <WithSite config={cfg}>
      <OpeningHoursContent accordion sectionIds={['restaurant', 'lunch', 'middag']} />
    </WithSite>,
  )
}

/** Raderna i en lista som { dag: tider }. */
const rowsOf = (name: string) => {
  const region = screen.getByRole('region', { name })
  return Object.fromEntries([...region.querySelectorAll('.opening-hours-acc-row')].map((r) => [r.querySelector('dt')!.textContent, r.querySelector('dd')!.textContent]))
}

describe('Opening hours as an accordion', () => {
  it('shows the three lists as headings, all closed to begin with', () => {
    renderHours(split)
    for (const name of ['ANAR Restaurang & Bar', 'Lunch', 'Middag']) {
      expect(screen.getByRole('button', { name })).toHaveAttribute('aria-expanded', 'false')
    }
  })

  it('opens one list at a time, and closes it again on a second click', async () => {
    const user = userEvent.setup()
    renderHours(split)
    const lunch = screen.getByRole('button', { name: 'Lunch' })
    const dinner = screen.getByRole('button', { name: 'Middag' })

    await user.click(lunch)
    expect(lunch).toHaveAttribute('aria-expanded', 'true')
    expect(dinner).toHaveAttribute('aria-expanded', 'false')

    await user.click(dinner)
    expect(lunch).toHaveAttribute('aria-expanded', 'false')
    expect(dinner).toHaveAttribute('aria-expanded', 'true')

    await user.click(dinner)
    expect(screen.getAllByRole('button').filter((b) => b.getAttribute('aria-expanded') === 'true')).toHaveLength(0)
  })

  it('points each heading at its list, so a screen reader reads them together', () => {
    renderHours(split)
    const button = screen.getByRole('button', { name: 'Lunch' })
    expect(document.getElementById(button.getAttribute('aria-controls')!)).toBe(screen.getByRole('region', { name: 'Lunch' }))
  })

  it("takes every time from Booqy's opening hours: the restaurant's as entered, lunch and dinner as the same ranges split at 16:00", () => {
    renderHours(split)
    expect(rowsOf('ANAR Restaurang & Bar')).toMatchObject({ lördag: '12-23', måndag: '11-14, 17-22', tisdag: '11-14:30, 17-21', söndag: 'Stängt' })
    expect(rowsOf('Lunch')).toMatchObject({ lördag: '12-16', måndag: '11-14', tisdag: '11-14:30', onsdag: 'Stängt' })
    expect(rowsOf('Middag')).toMatchObject({ lördag: '16-23', måndag: '17-22', tisdag: '17-21', onsdag: 'Stängt' })
  })

  it('lists the days in Anar\'s order, one row per day', () => {
    renderHours(split)
    expect(Object.keys(rowsOf('ANAR Restaurang & Bar'))).toEqual(['lördag', 'söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag'])
  })

  it('leaves out a list that has no hours at all, such as lunch at a dinner-only restaurant', () => {
    renderHours({ monday: [{ opensAt: '17:00', closesAt: '22:00' }] })
    expect(screen.getByRole('button', { name: 'Middag' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Lunch' })).not.toBeInTheDocument()
  })
})
