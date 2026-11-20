import type { ComponentType } from 'react'
import * as kit from '@bookingsystemadvancedorg/site-kit'

/**
 * Språkstödet från site-kit, version-säkert.
 *
 * Webbplatsen kan översättas till engelska, spanska, arabiska och persiska
 * (Amazon Translate) från den site-kit-version som har språkstödet. Äldre
 * versioner (0.3.0) saknar det: då är `LanguagePicker` null,
 * `useKitLanguage()` ger null och Anars eget språkval (src/anar/i18n) gäller
 * som förut. Språkleverantören ligger redan i kitets SiteProvider.
 *
 * Namnen byggs ihop med flit: då försöker varken Rollup eller TypeScript
 * lösa exporter som saknas i 0.3.0. När sajten har uppgraderats kan raderna
 * bytas mot vanliga importer.
 */

export type KitLang = 'sv' | 'en' | 'es' | 'ar' | 'fa'

export interface KitLanguage {
  lang: KitLang
  setLang: (lang: KitLang) => void
  dir: 'ltr' | 'rtl'
  /** Intl-locale för datum och tal i det valda språket. */
  intlLocale: string
  /** Översättningar hämtas just nu. */
  pending: boolean
}

export type LanguagePickerComponent = ComponentType<{ className?: string }>

const exported = kit as unknown as Record<string, unknown>
const pickerExport = exported[['Language', 'Picker'].join('')]
const hookExport = exported[['use', 'Language'].join('')]

export const LanguagePicker: LanguagePickerComponent | null =
  typeof pickerExport === 'function' ? (pickerExport as LanguagePickerComponent) : null

/** Sant när site-kit har språkstödet (sidan översätts av kitet). */
export const hasKitLanguage = typeof hookExport === 'function' && LanguagePicker !== null

const noKitLanguage = (): KitLanguage | null => null

/** Kitets språk (värdet från useLanguage), eller null i site-kit utan språkstöd. */
export const useKitLanguage: () => KitLanguage | null = hasKitLanguage
  ? (hookExport as () => KitLanguage)
  : noKitLanguage
