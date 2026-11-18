import { describe, expect, it } from 'vitest'
import { descriptionParts, lunchTitle, pageOfCategory, priceText, varietyList } from './booqyMenu'

const item = (over: Record<string, unknown> = {}) => ({
  menuItemId: 'x',
  name: 'Rätt',
  description: '',
  price: 100,
  category: 'c',
  imageKey: null,
  ...over,
})

describe('booqyMenu', () => {
  it('lägger kategorierna på rätt sida efter namnet', () => {
    expect(pageOfCategory('Dagens lunch: Kabab')).toBe('dagens')
    expect(pageOfCategory('Kolgrill')).toBe('kolgrill')
    expect(pageOfCategory('Rött vin')).toBe('drink')
    expect(pageOfCategory('Öl & cider')).toBe('drink')
    expect(pageOfCategory('Shots')).toBe('drink')
    expect(pageOfCategory('Traditionella drycker')).toBe('meny')
    expect(pageOfCategory('Förrätter')).toBe('meny')
  })

  it('tar bort "Dagens lunch:" ur rubriken', () => {
    expect(lunchTitle('Dagens lunch: Klassiska varmrätter')).toBe('Klassiska varmrätter')
  })

  it('visar glas/flaska som två priser och sorter som lista', () => {
    const wine = item({ price: 89, options: [{ name: 'Storlek', required: true, maxChoices: 1, choices: [{ name: 'Glas', price: 0 }, { name: 'Flaska', price: 270 }] }] })
    expect(priceText(wine)).toBe('89 / 359 kr')
    const soda = item({ price: 25, options: [{ name: 'Sort', required: true, maxChoices: 1, choices: [{ name: 'Fanta', price: 0 }] }] })
    expect(priceText(soda)).toBe('25 kr')
    expect(varietyList(soda)).toEqual(['Fanta'])
  })

  it('gör sista raden i beskrivningen till en not', () => {
    expect(descriptionParts(item({ description: 'Text.\nNot.' }))).toEqual({ text: ['Text.'], note: 'Not.' })
    expect(descriptionParts(item({ description: 'Bara text.' }))).toEqual({ text: ['Bara text.'], note: null })
  })
})
