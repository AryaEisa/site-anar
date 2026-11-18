# Temporary bridge for site-kit 0.3.0

site-kit dev has the new table picker: tables that can be booked breathe,
tables of the wrong size are dimmed, a picked table pops with a ring, and the
page glides to the next step instead of jumping. This site still runs the
published site-kit 0.3.0, so this folder gives it the same look and
behaviour without forking the kit:

- `src/anar/styles/table-picker.css`: the kit's `table-picker.css` rules and
  a few resets of 0.3.0's old table colours.
- `tablePicker.ts`: the click effect, the delayed eased scroll and focus, the
  breathing sync and the step 3 hint text. Installed in `src/main.tsx`.
- `glide.ts`: a copy of the kit's `src/shared/glide.ts`.

Anar's colours are the `--seat-*` tokens in `src/anar/styles/kit.css`. They
stay after the bridge goes.

The script switches itself off when the kit draws tables with
`data-table-id`. When the site upgrades to a site-kit release that has
`src/styles/table-picker.css`, delete this folder,
`src/anar/styles/table-picker.css`, its import in `src/anar/styles/index.css`
and the `installTablePickerBridge()` call in `src/main.tsx`.
