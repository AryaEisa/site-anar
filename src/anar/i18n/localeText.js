/** Hämta text för valt språk; sträng = bakåtkompatibelt, objekt = { sv, en, fa }. */

export function pickLocale(node, locale) {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'object') {
    return node[locale] ?? node.sv ?? node.en ?? node.fa ?? '';
  }
  return String(node);
}

/** Kortform i datafiler: L(svenska, engelska, persiska) */
export function L(sv, en, fa) {
  return { sv, en, fa };
}
