/** Dagens lunch - sv / en / fa (meta-text i DagensLunchPage via t()). */
import { L } from '../i18n/localeText';

export const dagensLunchMeta = {
  title: 'Dagens lunch',
  hours: 'Vardagar kl 11-14:30',
  included: 'Ingår dryck, kakor, te, kaffe och soppa.',
  varmratterPrice: '150 kr',
};

export const dagensLunchVarmratter = [
  {
    title: L('Zereshk-polo ba morgh', 'Zereshk polo ba morgh', 'زرشک‌پلو با مرغ'),
    text: L(
      'Marinerad kycklingklubba i tomatsås, serveras med saffransris toppat med zereshk (berberisbär), mandelskivor, skivad söt apelsinskal och pistaschskivor. Ingår 1 dl mast-o-khiar.',
      'Marinated chicken drumsticks in tomato sauce with saffron rice, barberries, almonds, candied orange peel and pistachios. Includes 1 dl mast-o-khiar.',
      'ران مرغ در سس گوجه با برنج زعفرانی، زرشک، بادام، پوست پرتقال و پسته. یک پیمانه ماست و خیار.'
    ),
  },
  {
    title: L('Mosama morgh', 'Mosama morgh', 'مصاما مرغ'),
    text: L(
      'Marinerad kycklingklubba i tomatsås, stekt aubergine, serveras med saffransris toppat med zereshk (berberisbär). Ingår 1 dl mast-o-khiar.',
      'Marinated chicken in tomato sauce with fried aubergine. Saffron rice with barberries. Includes 1 dl mast-o-khiar.',
      'مرغ در سس گوجه با بادمجان؛ برنج زعفرانی و زرشک. ماست و خیار.'
    ),
  },
  {
    title: L('Ghormeh-sabzi', 'Ghormeh sabzi', 'قرمه‌سبزی'),
    text: L(
      'Lammgryta med bönor och torkad lime, stekta ghormeh-grönsaker (persilja, koriander, gräslök, bockhornsklöver), serveras med saffransris toppat med zereshk (berberisbär). Ingår 1 dl mast-o-khiar.',
      'Lamb stew with beans, dried lime and sautéed herbs (parsley, coriander, chives, fenugreek). Saffron rice with barberries. Includes 1 dl mast-o-khiar.',
      'خورش با لوبیا و لیمو عمانی و سبزی قورمه؛ برنج زعفرانی و زرشک. ماست و خیار.'
    ),
  },
  {
    title: L('Gheymeh ba sibzamini', 'Gheymeh with potatoes', 'قیمه با سیب‌زمینی'),
    text: L(
      'Lammgryta med gula linser, torkad lime, tomatpuré och pommes. Serveras med saffransris toppat med zereshk (berberisbär). Ingår 1 dl mast-o-khiar.',
      'Lamb stew with yellow lentils, dried lime, tomato purée and fries. Saffron rice with barberries. Includes 1 dl mast-o-khiar.',
      'قیمه با لپه، لیمو عمانی و سیب‌زمینی سرخ‌شده؛ برنج زعفرانی. ماست و خیار.'
    ),
  },
  {
    title: L('Gheymeh ba badenjan', 'Gheymeh with aubergine', 'قیمه با بادمجان'),
    text: L(
      'Lammgryta med gula linser, torkad lime, tomatpuré och stekt aubergine. Serveras med saffransris toppat med zereshk (berberisbär). Ingår 1 dl mast-o-khiar.',
      'Lamb stew with lentils, dried lime, tomato purée and fried aubergine. Saffron rice with barberries. Includes 1 dl mast-o-khiar.',
      'قیمه با لپه و بادمجان سرخ‌شده؛ برنج زعفرانی. ماست و خیار.'
    ),
  },
  {
    title: L('Khoreshte bamieh (vegan) - 150 kr', 'Khoreshte bamieh (vegan) - 150 SEK', 'خورشت بامیه (وگان) - ۱۵۰ کرون'),
    text: L(
      'Okra, morot, lök, tomatpuré, pommes, serveras med saffransris toppat med zereshk (berberisbär).',
      'Okra, carrot, onion, tomato purée, fries. Saffron rice with barberries.',
      'بامیه، هویج، پیاز، رب و سیب‌زمینی؛ برنج زعفرانی و زرشک.'
    ),
  },
  {
    title: L('Khoreshe kado va bademjan (vegan) - 150 kr', 'Khoreshe kado va bademjan (vegan) - 150 SEK', 'خورش کدو و بادمجان (وگان) - ۱۵۰ کرون'),
    text: L(
      'Stekt aubergine, stekt zucchini, tomatpuré, serveras med saffransris toppat med zereshk (berberisbär). Ingår 1 dl mast-o-khiar.',
      'Fried aubergine and courgette, tomato purée. Saffron rice with barberries. Includes 1 dl mast-o-khiar.',
      'بادمجان و کدو با رب؛ برنج زعفرانی. ماست و خیار.'
    ),
  },
];

export const dagensLunchKolgrill = [
  {
    title: L('Bakhtiari', 'Bakhtiari', 'بختیاری'),
    text: L(
      'En blandning av chenje och joojeh på samma spett. Serveras med kolgrillad tomat, piaz jafari (blandad rödlök med persilja), smör, sumak och saffransris.',
      'Chenje and joojeh on one skewer. Grilled tomato, onion-parsley salad, butter, sumac and saffron rice.',
      'چنجه و جوجه روی یک سیخ؛ گوجه کبابی، پیازچه، کره، سماق و برنج زعفرانی.'
    ),
  },
  {
    title: L('Chenje', 'Chenje', 'چنجه'),
    text: L(
      'Kolgrillade lammsteksbitar smaksatta med lök och svartpeppar. Serveras med kolgrillad tomat, piaz jafari (blandad rödlök med persilja), smör, sumak och saffransris.',
      'Grilled lamb with onion and black pepper. Grilled tomato, onion-parsley salad, butter, sumac and saffron rice.',
      'گوشت ران گوسفند کبابی با پیاز و فلفل سیاه؛ گوجه کبابی و برنج زعفرانی.'
    ),
  },
  {
    title: L('Kobideh', 'Koobideh', 'کوبیده'),
    text: L(
      'Kolgrillad köttfärs, två spett, serveras med kolgrillad tomat, piaz jafari (blandad rödlök med persilja), smör, sumak och saffransris. Ingår 1 dl mast-o-khiar.',
      'Two minced-meat kebab skewers. Grilled tomato, onion-parsley salad, butter, sumac and saffron rice. Includes 1 dl mast-o-khiar.',
      'دو سیخ کوبیده؛ گوجه کبابی، پیازچه، کره، سماق و برنج. ماست و خیار.'
    ),
  },
  {
    title: L('Joojeh', 'Joojeh', 'جوجه'),
    text: L(
      'Kolgrillad kycklingfilé smaksatt med saffran, lök, färsk citron, röd chili och färsk paprika. Serveras med kolgrillad tomat, piaz jafari (blandad rödlök med persilja), smör, sumak och saffransris.',
      'Grilled chicken fillet with saffron, onion, lemon, chilli and pepper. Grilled tomato, onion-parsley salad, butter, sumac and saffron rice.',
      'سینه مرغ کبابی با زعفران، پیاز، لیمو و فلفل؛ گوجه و برنج زعفرانی.'
    ),
  },
  {
    title: L('Vegan kabab - 99 kr', 'Vegan kebab - 99 SEK', 'کباب وگان - ۹۹ کرون'),
    text: L(
      'Kolgrillade grönsaker (zucchini, paprika, champinjoner, lök, tomat). Serveras med piaz jafari (blandad rödlök med persilja), sumak och saffransris. Ingår 1 dl mast-o-khiar.',
      'Grilled vegetables (courgette, pepper, mushrooms, onion, tomato). Onion-parsley salad, sumac and saffron rice. Includes 1 dl mast-o-khiar.',
      'سبزیجات کبابی؛ پیازچه، سماق و برنج. ماست و خیار.'
    ),
  },
];
