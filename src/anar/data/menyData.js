/** A la carte - trespråkigt innehåll (sv / en / fa). Rubriker: t(`meny.sec.${id}`). */
import { L } from '../i18n/localeText';

export const menySections = [
  {
    id: 'forratter',
    intro: [
      L(
        'Våra förrätter är baserade på gamla recept från olika delar av Iran. Med färska örter, aubergine, vitlök, yoghurt och persiska smaksättningar bjuder vi på rätter som passar både nyfikna och vana matälskare. Serveras alltid med traditionellt persiskt bröd - sangak.',
        'Our starters are based on old recipes from different parts of Iran. With fresh herbs, aubergine, garlic, yoghurt and Persian seasonings, we serve dishes for curious diners and regulars alike. Always with traditional Persian sangak bread.',
        'پیش‌غذاهای ما بر پایهٔ رسپی‌های کهن از نقاط مختلف ایران است؛ با سبزی تازه، بادمجان، سیر، ماست و چاشنی‌های ایرانی. همیشه با نان سنگک سنتی سرو می‌شود.'
      ),
      L(
        '( Det går även att beställa som huvudrätt för 150 kr.)',
        '(Also available as a main course for 150 SEK.)',
        '(قابل سفارش به‌عنوان غذای اصلی به قیمت ۱۵۰ کرون.)'
      ),
    ],
    dishes: [
      {
        title: L(
          'KOKO SABZI (vegetarisk) - 100 kr',
          'KOKO SABZI (vegetarian) - 100 SEK',
          'کوکو سبزی (گیاهی) - ۱۰۰ کرون'
        ),
        paragraphs: [
          L(
            'Persisk örtomelett med ägg, vitlökspulver och färska örter som dill, persilja, koriander, bockhornsklöver och spenat. Serveras varm med tomatskivor, saltgurka och sangakbröd.',
            'Persian herb omelette with egg, garlic powder and fresh herbs: dill, parsley, coriander, fenugreek and spinach. Served warm with tomato slices, pickled cucumber and sangak bread.',
            'کوکو سبزی ایرانی با تخم‌مرغ، پودر سیر و سبزی‌های تازه (شوید، جعفری، گشنیز، شنبلیله و اسفناج). گرم با گوجه، خیارشور و نان سنگک.'
          ),
          L(
            'En klassiker från det persiska köket - mild och örtig.',
            'A Persian classic - mild and herb-forward.',
            'کلاسیک آشپزخانهٔ ایرانی - ملایم و پرعطر سبزی.'
          ),
        ],
      },
      {
        title: L(
          'KASHKE BADEMJAN (vegetarisk) - 100 kr',
          'KASHKE BADEMJAN (vegetarian) - 100 SEK',
          'کشک بادمجان (گیاهی) - ۱۰۰ کرون'
        ),
        paragraphs: [
          L(
            'Stekt aubergine, lök och vitlök blandas med persisk "kashk" (vassle) och toppas med mynta, friterad lök och ytterligare kashk. Serveras med sangakbröd.',
            'Fried aubergine, onion and garlic folded with Persian kashk (whey) and topped with mint, crispy onion and more kashk. Served with sangak bread.',
            'بادمجان سرخ‌شده با پیاز و سیر، با کشک ایرانی، نعنا، پیاز داغ و کشک اضافه. با نان سنگک.'
          ),
          L(
            'En av Irans mest älskade röror - krämig och full av tradition.',
            'One of Iran’s best-loved dips - creamy and deeply traditional.',
            'از محبوب‌ترین خوراک‌های ایران - نرم و اصیل.'
          ),
        ],
      },
      {
        title: L(
          'MIRZA GHASEMI (vegetarisk) - 100 kr',
          'MIRZA GHASEMI (vegetarian) - 100 SEK',
          'میرزا قاسمی (گیاهی) - ۱۰۰ کرون'
        ),
        paragraphs: [
          L(
            'Rökt aubergineröra med vitlök, stekt ägg och en mustig tomatsås gjord på färska, stekta tomater. Serveras varm med nygräddat sangakbröd.',
            'Smoky aubergine dip with garlic, fried egg and a rich tomato sauce from fresh fried tomatoes. Served warm with freshly baked sangak bread.',
            'کشک بادمجان دودی با سیر، تخم‌مرغ سرخ‌شده و سس گوجهٔ غلیظ از گوجهٔ تازه. گرم با نان سنگک تازه.'
          ),
          L(
            'En traditionell, smakrik, rustik och älskad rätt från norra Iran - kan även serveras i vegansk version',
            'A traditional, flavourful rustic favourite from northern Iran - vegan version available.',
            'غذای سنتی، پرطعم و دوست‌داشتنی شمال ایران؛ نسخهٔ وگان هم ممکن است.'
          ),
        ],
      },
      {
        title: L(
          'BADENJAN PORANI (vegetarisk) - 100 kr',
          'BADENJAN PORANI (vegetarian) - 100 SEK',
          'بادمجان پورانی (گیاهی) - ۱۰۰ کرون'
        ),
        paragraphs: [
          L(
            'Friterade aubergineskivor varvas med stekta tomater, kryddor och serveras på ett lager yoghurt. Toppas med mer yoghurt.',
            'Fried aubergine slices layered with fried tomatoes and spices on a bed of yoghurt, topped with more yoghurt.',
            'برش‌های بادمجان سرخ‌شده لایه‌لایه با گوجه و ادویه روی ماست؛ رویش ماست اضافه.'
          ),
          L(
            'Varm förrätt - mild, krämig och vacker i lager.',
            'Warm starter - mild, creamy and beautifully layered.',
            'پیش‌غذای گرم - ملایم، کرمی و لایه‌لایه.'
          ),
        ],
      },
      {
        title: L('SALLAD OLIVIEH - 119 kr', 'SALLAD OLIVIEH - 119 SEK', 'سالاد الویه - ۱۱۹ کرون'),
        paragraphs: [
          L(
            'Krämig kycklingsallad med potatis, ärtor, morot, saltgurka och majonnäs. Serveras kall med tomat- och saltgurkskivor samt sangakbröd.',
            'Creamy chicken salad with potato, peas, carrot, pickles and mayonnaise. Served cold with tomato and pickle slices and sangak bread.',
            'سالاد مرغ کرمی با سیب‌زمینی، نخودفرنگی، هویج، خیارشور و مایونز؛ سرد با گوجه و نان سنگک.'
          ),
          L(
            'Persisk version av potatissallad - perfekt som kall förrätt eller lätt lunch.',
            'Persian-style potato salad - perfect cold starter or light lunch.',
            'نسخهٔ ایرانی سالاد سیب‌زمینی - عالی به‌عنوان پیش‌غذای سرد یا ناهار سبک.'
          ),
        ],
      },
    ],
  },
  {
    id: 'klassiska',
    dishes: [
      {
        title: L('ZERESHK-POLO BA MORGH - 170 kr', 'ZERESHK POLO BA MORGH - 170 SEK', 'زرشک‌پلو با مرغ - ۱۷۰ کرون'),
        paragraphs: [
          L(
            'Marinerad kycklingklubba långkokt i smakrik tomatsås, serverad med doftande saffransris toppat med zereshk (berberisbär). Kompletteras med mast-o-khiar (persisk yoghurt med gurka) vid sidan.',
            'Marinated chicken drumsticks slow-cooked in a rich tomato sauce, with fragrant saffron rice topped with barberries. Served with mast-o-khiar (yoghurt and cucumber) on the side.',
            'ران مرغ مارینه‌شده در سس گوجه، با برنج زعفرانی و زرشک؛ همراه ماست و خیار.'
          ),
        ],
      },
      {
        title: L(
          'GHEYMEH BA SIBZAMINI / BADENJAN - 170 kr',
          'GHEYMEH WITH POTATO / AUBERGINE - 170 SEK',
          'قیمه با سیب‌زمینی / بادمجان - ۱۷۰ کرون'
        ),
        paragraphs: [
          L(
            'Lammgryta med gula linser, torkad lime, tomatpuré, pommes / stekt aubergine. Serveras med saffransris toppad med zereshk (berberis bär). Ingår 1 dl mast o khiar.',
            'Lamb stew with yellow lentils, dried lime, tomato purée, fries or fried aubergine. Saffron rice with barberries. Includes 1 dl mast-o-khiar.',
            'خورش قیمه با لپه، لیمو عمانی، رب گوجه و سیب‌زمینی سرخ‌شده یا بادمجان؛ برنج زعفرانی و زرشک. یک پیمانه ماست و خیار.'
          ),
        ],
      },
      {
        title: L('GHORMEH-SABZI  - 170 kr', 'GHORMEH SABZI - 170 SEK', 'قرمه‌سبزی - ۱۷۰ کرون'),
        paragraphs: [
          L(
            'Lammgryta med, bönor och torkad lime, stekt ghorme grönsaker (persilja, koriander, gräslök, bockhornsklöver) serveras med saffransris toppad med zereshk (berberis bär). Ingår 1 dl mast o khiar.',
            'Lamb stew with beans, dried lime and sautéed herb mix (parsley, coriander, chives, fenugreek). Saffron rice with barberries. Includes 1 dl mast-o-khiar.',
            'خورش قرمه‌سبزی با لوبیا و لیمو عمانی و سبزی خردشده؛ برنج زعفرانی و زرشک. یک پیمانه ماست و خیار.'
          ),
        ],
      },
      {
        title: L('BAGHALI-POLO BA MAHICHEH - 210 kr', 'BAGHALI POLO BA MAHICHEH - 210 SEK', 'باقالی‌پلو با ماهیچه - ۲۱۰ کرون'),
        paragraphs: [
          L(
            'Långkokt Lammlägg, saffran, gul lök. serveras med dill blandad ris med bondbönor och toppad med saffransris. Ingår 1 dl mast o khiar och lammlägg sås.',
            'Slow-cooked lamb shank with saffron and onion, served with dill rice, broad beans and saffron rice. Includes 1 dl mast-o-khiar and lamb sauce.',
            'ماهیچهٔ گوسفندی با زعفران و پیاز؛ برنج باقالی و زعفران. ماست و خیار و سس ماهیچه.'
          ),
        ],
      },
      {
        title: L('GHABOLI POLO - 210 kr', 'GHABOLI POLO - 210 SEK', 'قابلی پلو - ۲۱۰ کرون'),
        paragraphs: [
          L(
            'Långkokt Lammlägg med aromatiska kryddor , ris med russin, morotsskivor och kummin. Ingår 1 dl mast o khiar/ Chakni.',
            'Slow-cooked lamb shank with aromatic spices, rice with raisins, carrot and cumin. Includes 1 dl mast-o-khiar / chutney.',
            'ماهیچه با ادویه؛ برنج با کشمش، هویج و زیره. ماست و خیار یا چکنی.'
          ),
        ],
      },
      {
        title: L('ZERESHK-POLO BA MAHICHEH - 210 kr', 'ZERESHK POLO BA MAHICHEH - 210 SEK', 'زرشک‌پلو با ماهیچه - ۲۱۰ کرون'),
        paragraphs: [
          L(
            'Långkokt Lammlägg, saffran, gul lök. serveras med saffransris och toppad med  zereshk (berberisbär). Ingår 1 dl mast o khiar och lammlägg sås.',
            'Slow-cooked lamb shank with saffron and onion, saffron rice topped with barberries. Includes 1 dl mast-o-khiar and lamb sauce.',
            'ماهیچه با زعفران؛ برنج زعفرانی و زرشک. ماست و خیار و سس.'
          ),
        ],
      },
      {
        title: L(
          'KABAB TABEI - Iransk kabab i stekpanna - 199 kr',
          'KABAB TABEI - pan-style Persian kebab - 199 SEK',
          'کباب تابه‌ای - ۱۹۹ کرون'
        ),
        paragraphs: [
          L(
            'lammfärs, gul lök , tomatsås, stekt tomat och sumak. Serveras med saffransris toppad med zereshk (berberis bär). Ingår 1 dl mast o khiar.',
            'Minced lamb, onion, tomato sauce, fried tomato and sumac. Saffron rice with barberries. Includes 1 dl mast-o-khiar.',
            'گوشت چرخ‌کرده، پیاز، سس گوجه، گوجه سرخ‌شده و سماق؛ برنج زعفرانی و زرشک. ماست و خیار.'
          ),
        ],
      },
      {
        title: L('GHEYMEH NESAR - 170 kr', 'GHEYMEH NESAR - 170 SEK', 'قیمه نثار - ۱۷۰ کرون'),
        paragraphs: [
          L(
            'Lammgryta, Lök, Saffran, zereshk (berberis bär), Mandelskivor, skivad söt pelsinskal , Pistasch Skivor, Kardemumma, serveras med saffransris. Ingår 1 dl mast o khiar.',
            'Lamb stew with onion, saffron, barberries, almond slices, candied orange peel, pistachio and cardamom. Saffron rice. Includes 1 dl mast-o-khiar.',
            'خورش قیمه با پیاز، زعفران، زرشک، بادام، پوست پرتقال، پسته و هل؛ برنج زعفرانی. ماست و خیار.'
          ),
        ],
      },
      {
        title: L('MOSAMA MORGH - 170 kr', 'MOSAMA MORGH - 170 SEK', 'مصاما مرغ - ۱۷۰ کرون'),
        paragraphs: [
          L(
            'Marinerad kycklingklubba i tomatsås, Stekt aubergine, serveras med saffransris toppad med zereshk (berberis bär). Ingår 1 dl mast o khiar.',
            'Marinated chicken in tomato sauce with fried aubergine. Saffron rice with barberries. Includes 1 dl mast-o-khiar.',
            'مرغ در سس گوجه با بادمجان سرخ‌شده؛ برنج زعفرانی و زرشک. ماست و خیار.'
          ),
        ],
      },
      {
        title: L('KHORESHTE BAMIEH ( VEGAN) 149 kr', 'KHORESHTE BAMIEH (VEGAN) 149 SEK', 'خورشت بامیه (وگان) ۱۴۹ کرون'),
        paragraphs: [
          L(
            'Okra, morot, lök, tomat puré, pommes, serveras med saffransris toppad med  zereshk (berberisbär).',
            'Okra, carrot, onion, tomato purée, fries. Saffron rice with barberries.',
            'بامیه، هویج، پیاز، رب و سیب‌زمینی؛ برنج زعفرانی و زرشک.'
          ),
        ],
      },
      {
        title: L(
          'KHORESHE KADO VA BADEMJAN ( VEGAN) - 149 kr',
          'KHORESHE KADO VA BADEMJAN (VEGAN) - 149 SEK',
          'خورش کدو و بادمجان (وگان) - ۱۴۹ کرون'
        ),
        paragraphs: [
          L(
            'Stekt aubergine, stekt zucchini, omat purè, serveras med saffransris toppad med  zereshk (berberisbär). Ingår 1 dl mast o khiar.',
            'Fried aubergine and courgette, tomato purée. Saffron rice with barberries. Includes 1 dl mast-o-khiar.',
            'بادمجان و کدو سرخ‌شده با رب؛ برنج زعفرانی و زرشک. ماست و خیار.'
          ),
        ],
      },
    ],
  },
  {
    id: 'helg',
    intro: [
      L(
        'Omsorgsfullt komponerade helgrätter som balanserar tradition och modern elegans - skapade för en raffinerad helgupplevelse.',
        'Weekend specials balancing tradition and modern elegance - crafted for a refined weekend experience.',
        'غذاهای آخر هفته با ترکیب سنت و ظرافت مدرن.'
      ),
    ],
    dishes: [
      {
        title: L(
          '⭐Chelo-Gardan 259 kr (Bara lördagar)',
          '⭐Chelo Gardan 259 SEK (Saturdays only)',
          '⭐چلو گردن ۲۵۹ کرون (فقط شنبه‌ها)'
        ),
        paragraphs: [
          L(
            'Långsamt tillagad lammnacke som får sin djupa arom från lök, vitlök, smör och subtila kryddor. Serveras med ett luftigt saffransris, toppat med syrligt zereshk och karamelliserad lök - en elegant och fyllig tolkning av en klassisk persisk helgrätt.',
            'Slow-cooked lamb neck with onion, garlic, butter and subtle spices. Fluffy saffron rice with tart barberries and caramelised onion - an elegant weekend classic.',
            'گردن گوسفند آرام‌پز با پیاز، سیر، کره و ادویه؛ برنج زعفرانی با زرشک و پیاز کاراملی.'
          ),
        ],
      },
      {
        title: L(
          '⭐Tahchin gosht ba bademjan 199 kr (Bara lördagar)',
          '⭐Tahchin with lamb & aubergine 199 SEK (Saturdays only)',
          '⭐ته‌چین گوشت و بادمجان ۱۹۹ کرون (فقط شنبه‌ها)'
        ),
        paragraphs: [
          L(
            'Ett elegant bakat saffransris där lammkött, ägg och yoghurt binds samman till en len och aromrik helhet, smaksatt med kardemumma och rosenvatten. Serveras med stekt aubergine och toppas med syrlig zereshk, rostade mandel- och pistageskivor samt finstrimlad söt apelsinskal - en sofistikerad tolkning av en klassisk persisk fest­rätt.',
            'Baked saffron rice cake with lamb, egg and yoghurt, cardamom and rose water. Fried aubergine, barberries, almonds, pistachios and candied orange - a festive Persian classic.',
            'ته‌چین زعفرانی با گوسفند، تخم‌مرغ و ماست، هل و گلاب؛ بادمجان سرخ‌شده، زرشک، بادام و پسته.'
          ),
        ],
      },
      {
        title: L(
          '⭐ Dizi - Traditionell Långkok i Rostfri Skål 199 kr (Bara fredagar & lördagar)',
          '⭐ Dizi - slow-cooked stew in steel bowl 199 SEK (Fri & Sat)',
          '⭐ دیزی سنتی در کاسه استیل ۱۹۹ کرون (جمعه و شنبه)'
        ),
        paragraphs: [
          L(
            'Ett traditionellt långkok tolkat i modern fine dining-stil. Långsamt tillagat lamm, kikärter, tomat och saffranskryddor serveras i en stilren rostfri skål som bevarar arom och värme. Buljongen avnjuts separat, och den mjuka grytan mosas och äts med varmt bröd - en sofistikerad helgupplevelse med djupa rötter.',
            'Traditional slow-cooked lamb, chickpeas, tomato and saffron spices in a steel bowl. Broth served separately; the tender stew is mashed and eaten with warm bread.',
            'دیزی با گوسفند، نخود، گوجه و زعفران در کاسه؛ آب‌گوشت جدا؛ خورشت نرم با نان گرم.'
          ),
        ],
      },
    ],
  },
  {
    id: 'sidor',
    dishes: [
      {
        title: L('TORSHI - Inlagda grönsaker - 49 kr', 'TORSHI - pickled vegetables - 49 SEK', 'ترشی - ۴۹ کرون'),
        paragraphs: [
          L(
            'Vinäger, blomkål, aubergine, morot, vitlök, persiska schalottenlök, peperoni, kryddor (nigellafrön, gurkmeja, mynta), salt.',
            'Vinegar, cauliflower, aubergine, carrot, garlic, shallot, chilli, spices (nigella, turmeric, mint), salt.',
            'سرکه، گل‌کلم، بادمجان، هویج، سیر، موسیر، فلفل و ادویه.'
          ),
        ],
      },
      {
        title: L('SALAD SHIRAZI - 49 kr', 'SHIRAZI SALAD - 49 SEK', 'سالاد شیرازی - ۴۹ کرون'),
        paragraphs: [L('Gurka, tomat, rödlök, sur vindruvsjuice.', 'Cucumber, tomato, red onion, verjuice.', 'خیار، گوجه، پیاز، آبغوره.')],
      },
      {
        title: L('MAST O KHIAR - 49 kr', 'MAST-O-KHIAR - 49 SEK', 'ماست و خیار - ۴۹ کرون'),
        paragraphs: [L('Yoghurt blandad med gurka, salt och mynta.', 'Yoghurt with cucumber, salt and mint.', 'ماست با خیار، نمک و نعنا.')],
      },
      {
        title: L('MASTOMOOSIR - 49 kr', 'MAST-O-MOOSEER - 49 SEK', 'ماست موسیر - ۴۹ کرون'),
        paragraphs: [
          L('Yoghurt, salt och persiska schalottenlök.', 'Yoghurt, salt and Persian shallot (mooseer).', 'ماست، نمک و موسیر.'),
        ],
      },
      {
        title: L('ZEYTOON PARVARDEH - 49 kr', 'ZEYTOON PARVARDEH - 49 SEK', 'زیتون پرورده - ۴۹ کرون'),
        paragraphs: [
          L(
            'Oliver marinerat med granatäpple ,vitlök ,valnötter, mynta och örter.',
            'Olives with pomegranate, garlic, walnuts, mint and herbs.',
            'زیتون با انار، سیر، گردو، نعنا و سبزی.'
          ),
        ],
      },
    ],
  },
  {
    id: 'efterratt',
    dishes: [
      {
        title: L('SHOLEH ZARD - 49 kr', 'SHOLEH ZARD - 49 SEK', 'شله‌زرد - ۴۹ کرون'),
        paragraphs: [
          L(
            'Rispudding smaksatt med saffran, rosenvatten, kanel, riven mandel, serveras med tea eller kaffe.',
            'Saffron rice pudding with rose water, cinnamon and almond, served with tea or coffee.',
            'شله‌زرد با زعفران، گلاب، دارچین و بادام؛ با چای یا قهوه.'
          ),
        ],
      },
      {
        title: L('SAFFRAN HALVA - 49 kr', 'SAFFRON HALVA - 49 SEK', 'حلوا زعفرانی - ۴۹ کرون'),
        paragraphs: [
          L(
            'Vetemjöl, socker, smör, saffran, kardemumma, rosenvatten, mandelskivor serveras med tea eller kaffe.',
            'Flour, sugar, butter, saffron, cardamom, rose water, almond slices; with tea or coffee.',
            'آرد، شکر، کره، زعفران، هل، گلاب و بادام؛ با چای یا قهوه.'
          ),
        ],
      },
      {
        title: L('SAFFRAN TIRAMISU - 99 kr', 'SAFFRON TIRAMISU - 99 SEK', 'تیرامیسو زعفرانی - ۹۹ کرون'),
        paragraphs: [
          L(
            'En klassisk dessert med lager av mascarpone och ladyfingers som är indränkta i mjölk och saffran.',
            'Layers of mascarpone and ladyfingers soaked in milk and saffron.',
            'لایه‌های ماسکارپونه و لیدی‌فینگر با شیر و زعفران.'
          ),
        ],
      },
      {
        title: L('BASANI ZAFFRANI - 69 kr', 'SAFFRON ICE CREAM (BASTANI) - 69 SEK', 'بستنی زعفرانی - ۶۹ کرون'),
        paragraphs: [
          L(
            'Saffran, gräddglass, Socker, Rosenvatten, Pistasch, Kardemmuma, persisk rose, (Saffransglass).',
            'Saffron ice cream with sugar, rose water, pistachio, cardamom and rose.',
            'بستنی زعفرانی با شکر، گلاب، پسته، هل و گل محمدی.'
          ),
        ],
      },
    ],
  },
  {
    id: 'trad-dryck',
    dishes: [
      {
        title: L('DOOGH - 20 kr', 'DOOGH - 20 SEK', 'دوغ - ۲۰ کرون'),
        paragraphs: [L('Yoghurt, mynta och salt.', 'Yoghurt, mint and salt.', 'ماست، نعنا و نمک.')],
      },
      {
        title: L('SHAHD ABE ZAFFERON - 39 kr', 'SAFFRON SHARBAT - 39 SEK', 'شربت زعفران - ۳۹ کرون'),
        paragraphs: [
          L(
            'Saffran, socker, färsk citronjuice, vatten och isbitar.',
            'Saffron, sugar, fresh lemon, water and ice.',
            'زعفران، شکر، آب لیمو، آب و یخ.'
          ),
        ],
      },
      {
        title: L('SHAHD ABE KHIAR SEKANGEBIN - 39 kr', 'CUCUMBER SEKANJEBIN SHARBAT - 39 SEK', 'شربت سکنجبین خیار - ۳۹ کرون'),
        paragraphs: [
          L(
            'Sekangabin , gurka, färsk citronjuice, vatten och isbitar.',
            'Sekanjabin syrup, cucumber, lemon, water and ice.',
            'سکنجبین، خیار، لیمو، آب و یخ.'
          ),
        ],
      },
      {
        title: L('SHAHD ABE KHAKESHIR - 39 kr', 'KHAKSHIR SHARBAT - 39 SEK', 'شربت خاکشیر - ۳۹ کرون'),
        paragraphs: [
          L(
            'Stillfrö, socker, färsk citronjuice, vatten och isbitar.',
            'Khakshir seeds, sugar, lemon, water and ice.',
            'خاکشیر، شکر، لیمو، آب و یخ.'
          ),
        ],
      },
      {
        title: L('SHAHD ABE TOKHM SHARBATI - 39 kr', 'BASIL SEED SHARBAT - 39 SEK', 'شربت تخم شربتی - ۳۹ کرون'),
        paragraphs: [
          L(
            'Vilda basilikas frö, socker, färsk citronjuice, saffran, vatten och isbitar.',
            'Basil seeds, sugar, lemon, saffron, water and ice.',
            'تخم شربتی، شکر، لیمو، زعفران، آب و یخ.'
          ),
        ],
      },
      {
        title: L('SHAHD ABE ALBALOO 39 kr', 'SOUR CHERRY SHARBAT 39 SEK', 'شربت آلبالو ۳۹ کرون'),
        paragraphs: [
          L(
            'Surkörsbär sirap, socker,färsk citronjuice, vatten och isbitar.',
            'Sour cherry syrup, sugar, lemon, water and ice.',
            'شربت آلبالو، شکر، لیمو، آب و یخ.'
          ),
        ],
      },
      {
        title: L('SHAHD ABE BIDMESHK 39 kr', 'ORANGE BLOSSOM SHARBAT 39 SEK', 'شربت بهارنارنج ۳۹ کرون'),
        paragraphs: [
          L(
            'Sur apelsinblomma destillat, socker, färsk citronjuice, vatten och isbitar.',
            'Orange blossom distillate, sugar, lemon, water and ice.',
            'عرق بهار نارنج، شکر، لیمو، آب و یخ.'
          ),
        ],
      },
      {
        title: L('SHAHD ABE BAHARNARENJ 39 kr', 'ORANGE BLOSSOM SHARBAT 39 SEK', 'شربت بهارنارنج ۳۹ کرون'),
        paragraphs: [
          L(
            'Sur apelsinblomma destillat, socker, färsk citronjuice, vatten och isbitar.',
            'Orange blossom distillate, sugar, lemon, water and ice.',
            'عرق بهار نارنج، شکر، لیمو، آب و یخ.'
          ),
        ],
      },
    ],
  },
  {
    id: 'drycker',
    sublists: [
      {
        line: L('LÄSK 25 kr', 'SOFT DRINKS 25 SEK', 'نوشابه ۲۵ کرون'),
        items: [
          L('Coca Cola', 'Coca Cola', 'کوکاکولا'),
          L('Coca Cola Zero', 'Coca Cola Zero', 'کوکاکولا زیرو'),
          L('Fanta', 'Fanta', 'فانتا'),
          L('Fanta exotic', 'Fanta Exotic', 'فانتا اکزوتیک'),
          L('Pepsi', 'Pepsi', 'پپسی'),
          L('Pepsi Max', 'Pepsi Max', 'پپسی مکس'),
          L('Sprite', 'Sprite', 'اسپرایت'),
          L('7up', '7up', 'سون‌آپ'),
        ],
      },
      {
        line: L('MINERALVATTEN 25 kr', 'MINERAL WATER 25 SEK', 'آب معدنی ۲۵ کرون'),
        items: [L('Loka citron', 'Loka lemon', 'لوکا لیمو'), L('Ramlösa Original', 'Ramlösa Original', 'راملوسا')],
      },
    ],
  },
];
