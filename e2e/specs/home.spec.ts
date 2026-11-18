import { expect, test } from '@playwright/test'
import { CONFIGURED, NOT_CONFIGURED } from '../lib/site'

/**
 * Home page booking (projects ui-390 .. ui-1440): the booking card grows with
 * its steps and pushes the page down. At step 3 the table picker is fully
 * visible, nothing lies on top of it (elementFromPoint at its centre and near
 * its corners), "Hitta hit" starts below the booking, and a table can be
 * picked. Nothing is held or booked.
 */

test.skip(!CONFIGURED, NOT_CONFIGURED)

test('booking step 3: the table picker is visible, not covered and clickable @ux', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const main = page.locator('main')
  const days = main.getByRole('group', { name: /datum/i }).getByRole('button')
  test.skip((await days.count()) === 0, 'no booking on the home page')
  // Day after tomorrow, the latest time: clear of today's cut-offs.
  await days.nth(2).click()
  const times = main.getByRole('group', { name: 'Välj tid' }).getByRole('button')
  await expect(times.first()).toBeVisible()
  await times.last().click()
  const free = main.getByRole('group', { name: 'Lediga bord' }).getByRole('button')
  await expect(free.first()).toBeAttached()

  const step = main.locator('fieldset.booking-step', { has: page.getByRole('group', { name: 'Lediga bord' }) })
  const plan = step.locator('.floor-wrap')
  const picker = (await plan.count()) ? plan.first() : main.getByRole('group', { name: 'Lediga bord' })
  await picker.scrollIntoViewIfNeeded()

  const result = await picker.evaluate((el) => {
    const step = el.closest('fieldset')!
    const form = el.closest('form')!
    const split = form.closest('.desk-split')
    const next = split?.nextElementSibling ?? null
    const r = el.getBoundingClientRect()
    const points: [number, number][] = [
      [r.left + r.width / 2, r.top + r.height / 2],
      [r.left + 12, r.top + 12],
      [r.right - 12, r.top + 12],
      [r.left + 12, r.bottom - 12],
      [r.right - 12, r.bottom - 12],
    ]
    const covered = points
      .filter(([x, y]) => y >= 0 && y <= innerHeight && x >= 0 && x <= innerWidth)
      .map(([x, y]) => document.elementFromPoint(x, y))
      .filter((hit) => !hit || !step.contains(hit))
      .map((hit) => (hit ? `${hit.tagName}.${hit.className}` : 'nothing'))
    return {
      covered,
      height: r.height,
      formBottom: form.getBoundingClientRect().bottom,
      nextTop: next ? next.getBoundingClientRect().top : Infinity,
      formOverflow: form.scrollHeight - form.clientHeight,
    }
  })
  expect(result.height, 'picker height').toBeGreaterThan(100)
  expect(result.covered, 'elements on top of the table picker').toEqual([])
  expect(result.formOverflow, 'booking content cut off by its own box').toBeLessThanOrEqual(2)
  expect(result.formBottom, 'the next section starts below the booking').toBeLessThanOrEqual(result.nextTop + 1)

  await free.first().click()
  await expect(main.getByRole('button', { name: 'Bekräfta bord' })).toBeVisible()
})
