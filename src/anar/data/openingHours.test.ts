import { describe, expect, it } from 'vitest'
import { dinnerRows, hasHours, lunchRows, restaurantRows, splitByMeal } from './openingHours'

const hours = {
  monday: [{ opensAt: '17:00', closesAt: '22:00' }, { opensAt: '11:00', closesAt: '14:00' }],
  tuesday: [{ opensAt: '11:00', closesAt: '14:30' }, { opensAt: '17:00', closesAt: '21:00' }],
  saturday: [{ opensAt: '12:00', closesAt: '23:00' }],
  sunday: [{ opensAt: '18:00', closesAt: '02:00' }],
}

describe('opening hours from Booqy', () => {
  it('splits a day into lunch and dinner at 16:00', () => {
    expect(splitByMeal(hours.tuesday)).toEqual({
      lunch: [{ opensAt: '11:00', closesAt: '14:30' }],
      dinner: [{ opensAt: '17:00', closesAt: '21:00' }],
    })
  })

  it('cuts one long range in two, lunch before 16:00 and dinner from 16:00', () => {
    expect(splitByMeal(hours.saturday)).toEqual({
      lunch: [{ opensAt: '12:00', closesAt: '16:00' }],
      dinner: [{ opensAt: '16:00', closesAt: '23:00' }],
    })
  })

  it('treats a range past midnight as dinner', () => {
    expect(splitByMeal(hours.sunday)).toEqual({ lunch: [], dinner: [{ opensAt: '18:00', closesAt: '02:00' }] })
  })

  it('does not depend on the order Booqy sends the ranges in', () => {
    expect(restaurantRows(hours).find((r) => r.dayKey === 'monday')?.hours).toBe('11-14, 17-22')
  })

  it('makes one row per weekday in Anar\'s order, with closed days marked', () => {
    const rows = restaurantRows(hours)
    expect(rows.map((r) => r.dayKey)).toEqual(['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'])
    expect(rows.find((r) => r.dayKey === 'saturday')).toEqual({ dayKey: 'saturday', hours: '12-23' })
    expect(rows.find((r) => r.dayKey === 'wednesday')).toEqual({ dayKey: 'wednesday', closed: true })
  })

  it('writes lunch and dinner rows from the same data', () => {
    const lunch = Object.fromEntries(lunchRows(hours).map((r) => [r.dayKey, r.closed ? 'closed' : r.hours]))
    const dinner = Object.fromEntries(dinnerRows(hours).map((r) => [r.dayKey, r.closed ? 'closed' : r.hours]))
    expect(lunch).toMatchObject({ monday: '11-14', tuesday: '11-14:30', saturday: '12-16', sunday: 'closed', wednesday: 'closed' })
    expect(dinner).toMatchObject({ monday: '17-22', tuesday: '17-21', saturday: '16-23', sunday: '18-02', wednesday: 'closed' })
  })

  it('has no hours at all when the restaurant has entered none, and a list without any day is left out', () => {
    expect(restaurantRows(undefined).every((r) => r.closed)).toBe(true)
    expect(hasHours(restaurantRows(undefined))).toBe(false)
    expect(hasHours(lunchRows({ monday: [{ opensAt: '17:00', closesAt: '22:00' }] }))).toBe(false)
    expect(hasHours(dinnerRows({ monday: [{ opensAt: '17:00', closesAt: '22:00' }] }))).toBe(true)
  })
})
