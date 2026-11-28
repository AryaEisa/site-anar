# Temporary bridge: the floor plan starts in 2D

site-kit (0.5.0 too) starts the floor plan in booking step 3 in 3D
(`useState('3d')` in `BokaBordPage.tsx`, no setting). Anar wants 2D first,
with 3D as a choice, so `floorView.ts` presses the kit's "2D" button the
first time a view toggle (`.floor-view-toggle`) is drawn, before the first
frame. The guest's own choice is remembered until the page reloads.
Installed in `src/main.tsx` (`installDefault2dView()`).

When the site bumps to a site-kit release with its own default view (or a
setting for it), delete this folder and the `installDefault2dView()` call in
`src/main.tsx`.

Anar's table colours are the `--seat-*` tokens in `src/anar/styles/kit.css`;
the table picker itself (breathing tables, pick effect, glide) is the kit's
since 0.4.0.

## Second bridge: names on doors and windows (`planLabels.ts`)

The layout API gives every door a `kind` ("entrance", "kitchen"), but site-kit
draws all doors alike and its types leave `kind` out. `planLabels.ts` fetches
the same layout (`layoutApi.getPublicActiveLayout`) and puts a small text on
each door and window in the 2D and 3D plan (Entré, Kök, Dörr, Fönster). It is
installed from `SiteLayout.jsx` with the location id, the styles are in
`src/anar/styles/plan-labels.css`, and the kit's translator translates the
text because it is real text in the page.

It matches by order (the N-th door in the page is the N-th door in the data)
and names nothing when the counts differ. When site-kit names doors and
windows itself, delete `planLabels.ts`, its test, `plan-labels.css` and the
`installPlanLabels` call in `SiteLayout.jsx`.

## Third to ninth bridge: the table choice, the magnifying lens, the zoom buttons, the booking sections, the warning and the plan text

Both work on booking step 3 ("Välj ert bord") and are installed together with
`planLabels.ts` from `SiteLayout.jsx`. `layoutData.ts` fetches the layout once
per location for all of them.

- `tableMode.ts` (+ `plan-mode.css`): two choices at the top of step 3,
  "Automatiskt vald" (first) and "Välj bord själv", none chosen at first. In the
  first the bridge presses one of the kit's table buttons (a single table with
  the fewest seats that fit, random among equals), and the plan and the list
  are hidden until the guest switches back. The plan stays visible before any
  choice (the shared e2e tests pick a table right after the time). It needs
  `fieldset.booking-step`, `.booking-table-list` and the `data-option` on its
  buttons.
- `planLens.ts` (+ `plan-lens.css`): a round lens that follows the mouse over the
  2D or 3D plan and shows a 2.2 times larger copy of it. Mouse only. It needs
  `.f3d-scene` and `.floor-svg-frame`.

- `planZoom.ts` (+ `plan-zoom.css`): "+" and "-" buttons on the plan for mobile
  (700 px and narrower, or a touch screen). 2D: the SVG gets bigger in a scroll
  box; 3D: the scene is scaled around the middle and an up and down drag moves
  it. It sets `--plan-zoom` and `data-plan-zoom` on `.floor-wrap`. It needs
  `.floor-wrap`, `.floor-svg-frame` and `.f3d-scene`.

When site-kit has its own "any table" choice, magnifier and zoom, delete the
modules, their tests, the CSS files and the calls in `SiteLayout.jsx`.

- `bookingFlow.ts`: the booking goes section by section. A click on a date or on
  plus and minus for the number of people rolls the page to "Välj tid", a click
  on a time rolls to "Välj ert bord", and "Välj bord själv" rolls to the plan.
  It uses `src/anar/lib/stepGuide.ts` (the same engine as the catering form).
  It finds the parts by the number in the heading (`.step-no`), and needs
  `form.booking`, `.date-tile`, `.party-btn` and `.booking-times`.
- `tableWarning.ts` (+ `plan-warning.css`): a table that cannot be booked gives
  an amber warning with a triangle and the line "Välj ett bord som lyser." after
  the kit's own reason (`p.table-info`), rolled into view if it is off screen.
- `planText.ts` (+ `plan-text.css`): readable table numbers and seats in the 2D plan, also for low vision. It measures the screen
  pixels per unit of each plan (`--plan-k` on the SVG) so that the CSS can give the text a minimum size on the screen (number
  15 px, seats 11 px) however small the plan is drawn. The CSS also covers the 3D labels. It needs `.floor-svg` and the
  kit's classes `.floor-svg-table-label`, `.floor-svg-table-seats` and `.f3d-table-label`.
