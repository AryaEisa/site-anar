// npm run dev:mock - lokal förhandsvisning: samma API som dev, men /site-config
// får en påhittad plats när Booqy-datat saknar en, och den platsens meny kommer
// från mock-menu.json (Anars meny i Booqys form: kategorier, rätter, pris,
// tillval; samma struktur som ska läggas in i Booqy admin). Bokningstider finns
// inte på den platsen. Inget skrivs till API:t. Ta bort när platsen finns i Booqy.
import http from 'node:http'
import { readFileSync } from 'node:fs'

const MENU = readFileSync(new URL('./mock-menu.json', import.meta.url), 'utf8')

const UPSTREAM = 'https://dh2m5ildm7.execute-api.eu-north-1.amazonaws.com'
const day = (o, c) => [{ opensAt: o, closesAt: c }]
const location = {
  locationId: 'loc-anar',
  name: 'Anar',
  address: 'Djurgårdsgatan 33A, 582 29 Linköping',
  phoneNumber: '+46760056857',
  email: 'info@anarrestaurang.se',
  timezone: 'Europe/Stockholm',
  businessHours: {
    tuesday: day('11:00', '21:00'),
    wednesday: day('11:00', '21:00'),
    thursday: day('11:00', '21:00'),
    friday: day('11:00', '22:00'),
    saturday: day('12:00', '22:00'),
  },
  bookingDurationHours: 2,
  maxPartySizeOnline: 8,
  ordering: { pickup: true, prepMinutes: 20 },
  catering: true,
}

http
  .createServer(async (req, res) => {
    res.setHeader('access-control-allow-origin', '*')
    if (req.url.startsWith('/locations/loc-anar/menu')) {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(MENU)
      return
    }
    const r = await fetch(UPSTREAM + req.url, { method: req.method })
    let body = await r.text()
    if (req.url.startsWith('/site-config') && r.ok) {
      const cfg = JSON.parse(body)
      if (!cfg.locations?.length) cfg.locations = [location]
      body = JSON.stringify(cfg)
    }
    res.writeHead(r.status, { 'content-type': r.headers.get('content-type') ?? 'application/json' })
    res.end(body)
  })
  .listen(7072, () => console.log('mock api on 7072'))
