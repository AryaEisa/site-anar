/** Drinkmeny - sv / en / fa */
import { L } from '../i18n/localeText';

export const drinkMenySections = [
  {
    id: 'drinkar',
    dishes: [
      {
        title: L('Aperol spritz - 115 kr', 'Aperol spritz - 115 SEK', 'آپرول اسپریتز - ۱۱۵ کرون'),
        paragraphs: [L('Prosecco, aperol, sodavatten, apelsinskiva', 'Prosecco, Aperol, soda, orange slice', 'پرسکو، آپرول، سودا و پرتقال.')],
      },
      {
        title: L('Sex on the beach - 139 kr', 'Sex on the beach - 139 SEK', 'سکس آن د بیچ - ۱۳۹ کرون'),
        paragraphs: [
          L(
            'Vodka, peach liquor, orange juice, cranberry juice',
            'Vodka, peach liqueur, orange juice, cranberry juice',
            'ودکا، لیکور هلو، آب پرتقال، آب زغال‌اخته'
          ),
        ],
      },
      {
        title: L('Side car - 219 kr', 'Sidecar - 219 SEK', 'سایدکار - ۲۱۹ کرون'),
        paragraphs: [
          L(
            'Cognac (Hennessy), apelsinlikör, färsk lime juice',
            'Cognac (Hennessy), orange liqueur, fresh lime juice',
            'کونیاک (هنسی)، لیکور پرتقال، آب لیمو تازه'
          ),
        ],
      },
      {
        title: L('Margarita - 169 kr', 'Margarita - 169 SEK', 'مارگاریتا - ۱۶۹ کرون'),
        paragraphs: [
          L('Tequila, apelsinlikör, färsk citronjuice', 'Tequila, orange liqueur, fresh lemon juice', 'تکیلا، لیکور پرتقال، آب لیمو'),
        ],
      },
      {
        title: L('Pink Gin & tonic - 129 kr', 'Pink gin & tonic - 129 SEK', 'جین صورتی و تونیک - ۱۲۹ کرون'),
        paragraphs: [L('Pink Gin, tonic, citron', 'Pink gin, tonic, lemon', 'جین صورتی، تونیک، لیمو')],
      },
      {
        title: L('Gin & tonic - 119 kr', 'Gin & tonic - 119 SEK', 'جین و تونیک - ۱۱۹ کرون'),
        paragraphs: [L('Gin, tonic, citron', 'Gin, tonic, lemon', 'جین، تونیک، لیمو')],
      },
      {
        title: L('Mojito - 139 kr', 'Mojito - 139 SEK', 'موهیتو - ۱۳۹ کرون'),
        paragraphs: [
          L('Rum, brunt farinsocker, mynta, lime, sodavatten', 'Rum, brown sugar, mint, lime, soda', 'رام، شکر قهوه‌ای، نعنا، لیمو، سودا'),
        ],
      },
      {
        title: L('Juneberry Mojito - 129 kr', 'Juneberry Mojito - 129 SEK', 'موهیتو جون‌بری - ۱۲۹ کرون'),
        paragraphs: [
          L('Rum, juneberry red bull / sprite, lime, mynta', 'Rum, Juneberry Red Bull / Sprite, lime, mint', 'رام، ردبول/اسپرایت، لیمو، نعنا'),
        ],
      },
    ],
  },
  {
    id: 'rott-vin',
    intro: [L('Glas / flaska', 'Glass / bottle', 'گیلاس / بطری')],
    dishes: [
      {
        title: L('Vina Maipo (Spanien) - 89 / 359 kr', 'Vina Maipo (Spain) - 89 / 359 SEK', 'وینا مایپو (اسپانیا) - ۸۹ / ۳۵۹ کرون'),
        paragraphs: [
          L(
            'Ett medelfylligt vin med mjuka tanniner och inslag av mörka bär och färska örter. Behaglig eftersmak.',
            'Medium-bodied with soft tannins, dark berries and herbs. Pleasant finish.',
            'بدنه متوسط، تانین نرم، تم تیرهٔ توت‌ها و گیاهان؛ پایان دلپذیر.'
          ),
        ],
      },
      {
        title: L('The Merchant Irdabama (Irani) - 119 / 499 kr', 'The Merchant Irdabama (Iran) - 119 / 499 SEK', 'ایرداباما - ۱۱۹ / ۴۹۹ کرون'),
        paragraphs: [
          L('Light red, ruby.', 'Light red, ruby.', 'قرمز روشن، یاقوتی.'),
          L(
            'Bärig smak med inslag av hallon, tranbär, blodgrapefrukt och färska örter.',
            'Berry notes: raspberry, cranberry, blood grapefruit and herbs.',
            'تم توت‌فرنگی، زغال‌اخته، گریپ‌فروت و سبزی.'
          ),
        ],
      },
      {
        title: L('Hafez The Poet (Irani) - 169 / 619 kr', 'Hafez The Poet (Iran) - 169 / 619 SEK', 'حافظ - ۱۶۹ / ۶۱۹ کرون'),
        paragraphs: [
          L('Medium-dark red.', 'Medium-dark red.', 'قرمز نیمه‌تیره.'),
          L(
            'Fruktig smak med inslag av fat, skogshallon, örter, körsbär, lakrits, kryddpeppar, lingon och vanilj.',
            'Fruity with oak, wild raspberry, herbs, cherry, liquoris, allspice, lingon and vanilla.',
            'میوه‌ای با بلوط، تمشک جنگلی، گیلاس، شیرین‌بیان، ادویه و وانیل.'
          ),
        ],
      },
      {
        title: L('Saadi The Master (Irani) - 105 / 439 kr', 'Saadi The Master (Iran) - 105 / 439 SEK', 'سعدی - ۱۰۵ / ۴۳۹ کرون'),
        paragraphs: [
          L('Light ruby.', 'Light ruby.', 'یاقوتی روشن.'),
          L(
            'Bärig, något kryddig smak med inslag av lingon, skogshallon, färska örter och blodapelsin.',
            'Berry-forward, slightly spicy, lingon, wild raspberry, herbs and blood orange.',
            'توت‌فرنگی، کمی تند، زغال‌اخته، سبزی و پرتقال خونی.'
          ),
        ],
      },
      {
        title: L('Diako The King (Irani) - 129 / 519 kr', 'Diako The King (Iran) - 129 / 519 SEK', 'دیاکو - ۱۲۹ / ۵۱۹ کرون'),
        paragraphs: [
          L('Mörklila färg.', 'Dark purple.', 'بنفش تیره.'),
          L(
            'Mycket fruktig smak med inslag av björnbär, blåbär, plommon, viol, svartpeppar och mynta.',
            'Very fruity: blackberry, blueberry, plum, violet, black pepper and mint.',
            'بسیار میوه‌یی؛ شاه‌توت، آلو، بنفشه، فلفل سیاه و نعنا.'
          ),
        ],
      },
      {
        title: L('Ne Unique Youtab (Irani) - 109 / 459 kr', 'Ne Unique Youtab (Iran) - 109 / 459 SEK', 'یوتاب - ۱۰۹ / ۴۵۹ کرون'),
        paragraphs: [
          L('Dry orange, koppar.', 'Dry orange, copper.', 'نارنجی خشک، مسی.'),
          L(
            'Nyanserad, något utvecklad, mycket frisk smak med liten strävhet, inslag av torkade aprikoser, mango, marsipan, havtorn, apelsinskal, nötter och kryddor.',
            'Nuanced, developed, fresh with light astringency; dried apricot, mango, marzipan, sea buckthorn, orange peel, nuts and spice.',
            'پیچیده و تازه با زردآلو خشک، انبه، مارزیپان، سنجد، پوست پرتقال و ادویه.'
          ),
        ],
      },
    ],
  },
  {
    id: 'rose-vin',
    dishes: [
      {
        title: L('Ruida Domo Rosé - 89 / 249 kr', 'Ruida Domo Rosé - 89 / 249 SEK', 'رویدا دومو رزه - ۸۹ / ۲۴۹ کرون'),
        paragraphs: [
          L(
            'Denna somriga rosé har friska, fruktiga toner av jordgubb, blodapelsin och citrus. Ett svalkande avbrott i vardagen.',
            'Summer rosé with strawberry, blood orange and citrus - crisp and refreshing.',
            'رزه تابستانی با توت‌فرنگی، پرتقال خونی و مرکبات؛ خنک و میوه‌ای.'
          ),
        ],
      },
      {
        title: L('Pinot Noir Rosé - 109 / 359 kr', 'Pinot Noir Rosé - 109 / 359 SEK', 'پینو نویر رزه - ۱۰۹ / ۳۵۹ کرون'),
        paragraphs: [
          L(
            'Bärig, mycket frisk smak med inslag av smultron, färska örter, rabarber, persika och blodapelsin. En sällskapsdryck för mysiga kvällar.',
            'Berry-forward and fresh: wild strawberry, herbs, rhubarb, peach and blood orange.',
            'تم توت و سبزی، ریواس، هلو و پرتقال خونی؛ مناسب شب‌های دوستانه.'
          ),
        ],
      },
    ],
  },
  {
    id: 'vitt-vin',
    dishes: [
      {
        title: L(
          'The Warrior Ariobarzanes (Irani) - 109 / 399 kr',
          'The Warrior Ariobarzanes (Iran) - 109 / 399 SEK',
          'آریوبرزن - ۱۰۹ / ۳۹۹ کرون'
        ),
        paragraphs: [
          L('Light golden, amber.', 'Light golden, amber.', 'طلایی روشن، کهربایی.'),
          L(
            'Fruktig, utvecklad smak med liten strävhet, inslag av torkade äpplen, nötter, torkad frukt, havtorn och pomerans.',
            'Fruity, developed, light astringency; dried apple, nuts, dried fruit, sea buckthorn and bitter orange.',
            'میوه‌یی و رسیده با سیب خشک، خشکبار، سنجد و نارنج تلخ.'
          ),
        ],
      },
      {
        title: L('Ruida Domo - 99 / 359 kr', 'Ruida Domo - 99 / 359 SEK', 'رویدا دومو - ۹۹ / ۳۵۹ کرون'),
        paragraphs: [
          L(
            'Ett torrt, friskt och fruktigt vin från La Mancha i Spanien från Enjoy Wines. Detta husvin har friska toner av gröna äpplen och mogen citrus, som skapar en lättsam och smakfull känsla.',
            'Dry, fresh, fruity La Mancha house wine with green apple and ripe citrus.',
            'سفید خشک و تازه از لامانچا با سیب سبز و مرکبات رسیده.'
          ),
        ],
      },
    ],
  },
  {
    id: 'mousserande',
    dishes: [
      {
        title: L('Prosecco - 75 / 225 kr', 'Prosecco - 75 / 225 SEK', 'پرسکو - ۷۵ / ۲۲۵ کرون'),
        paragraphs: [],
      },
    ],
  },
  {
    id: 'shots',
    dishes: [
      {
        title: L('Persian empire Arak saggi (iransk vodka)', 'Persian Empire Arak Saggi (Persian spirit)', 'عرق سگی امپراتوری پارسی'),
        paragraphs: [L('4 cl / 6 cl - 79 / 109 kr', '4 cl / 6 cl - 79 / 109 SEK', '۴ / ۶ سانتی - ۷۹ / ۱۰۹ کرون')],
      },
      {
        title: L('Persian empire Gold Arak saggi (iransk vodka)', 'Persian Empire Gold Arak Saggi', 'عرق سگی طلایی'),
        paragraphs: [
          L('4 cl / 6 cl - 89 / 119 kr', '4 cl / 6 cl - 89 / 119 SEK', '۴ / ۶ سانتی - ۸۹ / ۱۱۹ کرون'),
          L('Lagrad på ekfat 1,5 år', 'Aged in oak 1.5 years', '۱۸ ماه در بشکه بلوط'),
        ],
      },
      { title: L('Smirnoff Vodka Red', 'Smirnoff Vodka Red', 'اسمیرنف قرمز'), paragraphs: [L('4 cl / 6 cl - 59 / 79 kr', '4 cl / 6 cl - 59 / 79 SEK', '۴ / ۶ سانتی - ۵۹ / ۷۹ کرون')] },
      { title: L('Jägermeister', 'Jägermeister', 'یگرمایستر'), paragraphs: [L('4 cl / 6 cl - 69 / 89 kr', '4 cl / 6 cl - 69 / 89 SEK', '۴ / ۶ سانتی - ۶۹ / ۸۹ کرون')] },
      {
        title: L('Whisky (Jack Daniel’s)', 'Whisky (Jack Daniel’s)', 'ویسکی جک دنیلز'),
        paragraphs: [L('4 cl / 6 cl - 79 / 109 kr', '4 cl / 6 cl - 79 / 109 SEK', '۴ / ۶ سانتی - ۷۹ / ۱۰۹ کرون')],
      },
      {
        title: L('Hennessy (cognac)', 'Hennessy (cognac)', 'هنسی (کونیاک)'),
        paragraphs: [L('4 cl / 6 cl - 119 / 179 kr', '4 cl / 6 cl - 119 / 179 SEK', '۴ / ۶ سانتی - ۱۱۹ / ۱۷۹ کرون')],
      },
      {
        title: L('Rum (Havana Club)', 'Rum (Havana Club)', 'رام هاوانا'),
        paragraphs: [L('4 cl / 6 cl - 59 / 79 kr', '4 cl / 6 cl - 59 / 79 SEK', '۴ / ۶ سانتی - ۵۹ / ۷۹ کرون')],
      },
      { title: L('Tequila', 'Tequila', 'تکیلا'), paragraphs: [L('4 cl / 6 cl - 69 / 89 kr', '4 cl / 6 cl - 69 / 89 SEK', '۴ / ۶ سانتی - ۶۹ / ۸۹ کرون')] },
      {
        title: L('Absolut Vodka', 'Absolut Vodka', 'آبسولوت'),
        paragraphs: [L('4 cl / 6 cl - 59 / 79 kr', '4 cl / 6 cl - 59 / 79 SEK', '۴ / ۶ سانتی - ۵۹ / ۷۹ کرون')],
      },
    ],
  },
  {
    id: 'ol-cider',
    intro: [L('Flaska 330 ml', 'Bottle 330 ml', 'بطری ۳۳۰ میلی‌لیتر')],
    dishes: [
      { title: L('Corona Extra 4,5 % - 59 kr', 'Corona Extra 4.5% - 59 SEK', 'کرونا ۴٫۵٪ - ۵۹ کرون'), paragraphs: [] },
      { title: L('Brooklyn Lager 5,2 % - 69 kr', 'Brooklyn Lager 5.2% - 69 SEK', 'بروکلین لاگر ۵٫۲٪ - ۶۹ کرون'), paragraphs: [] },
      { title: L('Carlsberg Hof 4,2 % - 59 kr', 'Carlsberg Hof 4.2% - 59 SEK', 'کارلسبرگ ۴٫۲٪ - ۵۹ کرون'), paragraphs: [] },
      { title: L('Carlsberg Export 5 % - 59 kr', 'Carlsberg Export 5% - 59 SEK', 'کارلسبرگ اکسپورت - ۵۹ کرون'), paragraphs: [] },
      { title: L('Heineken 5 % - 59 kr', 'Heineken 5% - 59 SEK', 'هاینیکن - ۵۹ کرون'), paragraphs: [] },
      {
        title: L('Carlsberg Pilsner alkoholfri - 35 kr', 'Carlsberg Pilsner alcohol-free - 35 SEK', 'کارلسبرگ بدون الکل - ۳۵ کرون'),
        paragraphs: [],
      },
      {
        title: L('Mariestads alkoholfri - 35 kr', 'Mariestads alcohol-free - 35 SEK', 'ماریستاد بدون الکل - ۳۵ کرون'),
        paragraphs: [],
      },
      { title: L('IPA India Pale Ale - 69 kr', 'IPA - 69 SEK', 'آی‌پی‌ای - ۶۹ کرون'), paragraphs: [] },
      { title: L('Ship Full of IPA - 69 kr', 'Ship Full of IPA - 69 SEK', 'شیپ فول آی‌پی‌ای - ۶۹ کرون'), paragraphs: [] },
      {
        title: L('Smirnoff Ice Double Black 4,7 % (Italien) - 69 kr', 'Smirnoff Ice Double Black 4.7% (Italy) - 69 SEK', 'اسمیرنف آیس - ۶۹ کرون'),
        paragraphs: [],
      },
      {
        title: L('Smirnoff Ice Tropical 4 % (Italien) - 69 kr', 'Smirnoff Ice Tropical 4% (Italy) - 69 SEK', 'اسمیرنف تروپیکال - ۶۹ کرون'),
        paragraphs: [],
      },
      {
        title: L('Kopparberg strawberry & lime 4,5 % (Sverige) - 59 kr', 'Kopparberg strawberry & lime 4.5% (Sweden) - 59 SEK', 'کوپاربرگ توت‌فرنگی و لیمو - ۵۹ کرون'),
        paragraphs: [],
      },
    ],
    sublists: [
      {
        line: L('Flaska 500 ml', 'Bottle 500 ml', 'بطری ۵۰۰ میلی‌لیتر'),
        items: [
          L('Mariestads 6,9 % - 69 kr', 'Mariestads 6.9% - 69 SEK', 'ماریستاد ۶٫۹٪ - ۶۹ کرون'),
          L('Norrlands Guld 6,9 % - 69 kr', 'Norrlands Guld 6.9% - 69 SEK', 'نورلاند گولد - ۶۹ کرون'),
          L('Norrlands Djup Lager 6,8 % - 69 kr', 'Norrlands Djup Lager 6.8% - 69 SEK', 'نورلاند دیپ - ۶۹ کرون'),
          L('Guldkällan 5 % - 69 kr', 'Guldkällan 5% - 69 SEK', 'گولدشیلان - ۶۹ کرون'),
          L('Bryggmästarens 5,7 % - 69 kr', 'Bryggmästarens 5.7% - 69 SEK', 'بریگمستارنز - ۶۹ کرون'),
          L('Falcon 5,2 % - 69 kr', 'Falcon 5.2% - 69 SEK', 'فالکن - ۶۹ کرون'),
        ],
      },
    ],
  },
];
