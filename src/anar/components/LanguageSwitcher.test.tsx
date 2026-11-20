import { render } from '@testing-library/react'
import type { ComponentType } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LanguageSwitcher from './LanguageSwitcher'

// Styr vad ./lang levererar; bryggan själv testas i src/shared/lang.bridge.test.ts.
const state = vi.hoisted(() => ({ picker: null as ComponentType<{ className?: string }> | null }))
vi.mock('../../shared/lang', async (importOriginal) => {
  const original = await importOriginal<typeof import('../../shared/lang')>()
  return {
    ...original,
    get LanguagePicker() {
      return state.picker
    },
  }
})

afterEach(() => {
  state.picker = null
})

describe('LanguageSwitcher', () => {
  it('shows nothing on a site-kit without languages (0.3.0)', () => {
    const { container } = render(<LanguageSwitcher />)
    expect(container).toBeEmptyDOMElement()
  })

  it("puts the kit picker in Anar's pill row, left to right, at the right", () => {
    state.picker = ({ className }) => <span data-testid="kit-picker" className={className} />
    const { getByTestId, container } = render(<LanguageSwitcher />)
    expect(getByTestId('kit-picker')).toHaveClass('language-switcher-picker')
    expect(container.querySelector('.language-switcher-ltr')).toHaveAttribute('dir', 'ltr')
    expect(container.querySelector('.language-switcher')).toContainElement(getByTestId('kit-picker'))
  })
})
