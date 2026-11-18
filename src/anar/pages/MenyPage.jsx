import MenyCategoryPage from '../components/MenyCategoryPage';
import { menySections } from '../data/menyData';

export default function MenyPage() {
  return (
    <MenyCategoryPage
      sections={menySections}
      sectionKeyPrefix="meny.sec"
      domPrefix="meny"
      panelId="meny-panel"
      mainId="meny-innehall"
      mainClassName="meny"
      heroKeys={{ eyebrow: 'meny.eyebrow', title: 'meny.heroTitle', lede: 'meny.lede' }}
      filterAriaKey="meny.filterAria"
      closeSheetAriaKey="meny.closeSheetAria"
    />
  );
}
