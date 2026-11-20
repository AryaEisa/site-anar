import { render } from '@testing-library/react'
import type { ComponentType } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Header from './Header'
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

vi.mock('@bookingsystemadvancedorg/site-kit', async (importOriginal) => {
  const original = await importOriginal<typeof import('@bookingsystemadvancedorg/site-kit')>()
  return {
    // Exporterna som bryggan letar efter (finns inte i 0.3.0).
    LanguagePicker: undefined,
    useLanguage: undefined,
    useKeepTerms: undefined,
    ...original,
    useSite: () => ({
      config: { tenant: { features: {} } },
      location: { locationId: 'loc-1', name: 'Anar', waitlist: null },
    }),
  }
})

vi.mock('./OpeningHoursDropdown', () => ({ default: () => null }))
vi.mock('./OpeningHoursModal', () => ({ default: () => null }))

afterEach(() => {
  state.picker = null
})

const renderHeader = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )

describe('LanguageSwitcher', () => {
  it('shows nothing on a site-kit without languages (0.3.0)', () => {
    const { container } = render(<LanguageSwitcher />)
    expect(container).toBeEmptyDOMElement()
    expect(renderHeader().container.querySelector('.language-switcher')).toBeNull()
  })

  it('puts the kit picker in the top bar at the right, next to the menu button', () => {
    state.picker = ({ className }) => <span data-testid="kit-picker" className={className} />
    const { getByTestId, container } = renderHeader()
    const picker = getByTestId('kit-picker')
    expect(picker).toHaveClass('language-switcher-picker')
    const tools = container.querySelector('.site-header .site-header-end .site-header-tools')!
    expect(tools).toContainElement(picker)
    // Väljaren först, menyknappen sist (längst till höger), allt vänster till höger.
    expect(tools.lastElementChild).toHaveClass('site-header-burger')
    expect(picker.closest('.language-switcher')).toHaveAttribute('dir', 'ltr')
    // Efter länkarna på dator.
    const nav = container.querySelector('.site-header-nav--right')!
    expect(nav.compareDocumentPosition(picker) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
})
