import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SiteProvider } from '@bookingsystemadvancedorg/site-kit'
import { json, siteConfig } from '@bookingsystemadvancedorg/site-kit/testing'
import App from './App'
import { LanguageProvider } from './anar/i18n/LanguageContext'

function renderSite() {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <SiteProvider>
          <App />
        </SiteProvider>
      </LanguageProvider>
    </MemoryRouter>,
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  sessionStorage.clear()
})

describe('App on SiteProvider', () => {
  it("renders Anar's shell on the restaurant from /site-config - nav, booking button and legal links", async () => {
    window.history.replaceState(null, '', '/?restaurang=testkrogen')
    const fetchMock = vi.fn(async (url: string) => {
      if (url.includes('/site-config')) return json(siteConfig())
      return json({ items: [] })
    })
    vi.stubGlobal('fetch', fetchMock)

    renderSite()

    expect((await screen.findAllByRole('link', { name: 'Meny' })).length).toBeGreaterThan(0)
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.test/site-config?slug=testkrogen')
    expect(screen.getAllByRole('link', { name: 'Boka bord' }).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Beställ hem' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Integritetspolicy' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Cookies' })).toBeInTheDocument()
  })

  it('hides booking when the plan has no reservations', async () => {
    window.history.replaceState(null, '', '/?restaurang=testkrogen')
    vi.stubGlobal('fetch', vi.fn(async (url: string) =>
      url.includes('/site-config')
        ? json(siteConfig({ features: { reservations: false } }))
        : json({ items: [] })))

    renderSite()

    await screen.findAllByRole('link', { name: 'Meny' })
    expect(screen.queryByRole('link', { name: 'Boka bord' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Bokningsvillkor' })).not.toBeInTheDocument()
  })

  it('an unknown or suspended restaurant shows a neutral page, nothing else', async () => {
    window.history.replaceState(null, '', '/?restaurang=nobody')
    vi.stubGlobal('fetch', vi.fn(async () => json({ error: 'not found' }, 404)))

    renderSite()

    expect(await screen.findByRole('heading', { name: 'Sidan är inte tillgänglig' })).toBeInTheDocument()
  })

  it('a network error offers a retry instead of another restaurant', async () => {
    window.history.replaceState(null, '', '/?restaurang=testkrogen')
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('Failed to fetch') }))

    renderSite()

    expect(await screen.findByRole('button', { name: 'Försök igen' }, { timeout: 5000 })).toBeInTheDocument()
  })
})
