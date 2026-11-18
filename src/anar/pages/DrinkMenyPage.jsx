import MenyCategoryPage from '../components/MenyCategoryPage';
import { drinkMenySections } from '../data/drinkMenyData';

export default function DrinkMenyPage() {
  return (
    <MenyCategoryPage
      sections={drinkMenySections}
      sectionKeyPrefix="drink.sec"
      domPrefix="drink"
      panelId="drink-meny-panel"
      mainId="drinkmeny-innehall"
      mainClassName="meny meny--drink"
      heroKeys={{ eyebrow: 'drink.eyebrow', title: 'drink.heroTitle', lede: 'drink.lede' }}
      filterAriaKey="drink.filterAria"
      closeSheetAriaKey="drink.closeSheetAria"
    />
  );
}
