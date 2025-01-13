export const categories =[

  {name: "М'ясні Бургери"},
  {name: "Гострі Бургери"},
  {name: "Дабл-бургери"},
  {name: "Домашня випічка"},
  {name: "Напої"},
  {name: "Десерти"},
]


 export const ingredients = [
  {
    name: 'Вершкова моцарела',
    price: 79,
    imageUrl:
      '/mozzarrela-small.png',
  },
  {
    name: 'Сир чедер',
    price: 79,
    imageUrl:
      '/cheder-small.png',
      
  },
   {
    name: 'Печериці',
    price: 59,
    imageUrl:
      '/mashrooms-small.png',
  },
  {
    name: 'Шинка',
    price: 79,
    imageUrl:
      '/meat-small.png',
  },
  {
    name: 'Свіжі огірочки',
    price: 59,
    imageUrl:
      '/cucumber-small.png',
  },
  {
    name: 'Свіжі томати',
    price: 59,
    imageUrl:
      '/tomato-small.png',
  },
  {
    name: 'Червона цибуля',
    price: 59,
    imageUrl:
      '/onion-small.png',
  },
  {
    name: 'Солодкий перець',
    price: 59,
    imageUrl:
      '/paper-small.png',
  },
  {
    name: 'Котлета куряча',
    price: 89,
    imageUrl:
      '/chick-small.png',
  },
  {
    name: 'Котлета свиняча',
    price: 99,
    imageUrl:
      '/swig-small.png',
  },
  {
    name: 'Сир твердий',
    price: 79,
    imageUrl:
      '/cheese-small.png',
  },
  {
    name: 'Листя салату',
    price: 49,
    imageUrl:
      '/salat-small.png',
  },
].map((obj, index) => ({ ...obj, id: index + 1  }));


export const products = [
  {  
    name: 'Сінабон',
    imageUrl: '/sinabon.png',
    categoryId: 4,
    text: 'Ніжна булочка з корицею, покрита вершковою глазур’ю, яка тане в роті.'
  },
  {  
    name: 'Французький круасан',
    imageUrl: '/kruasan.png',
    categoryId: 4,
    text: 'Класичний французький круасан з хрусткою скоринкою та ніжною текстурою.'
  },
  {  
    name: 'Мафіни',
    imageUrl: '/b-3.png',
    categoryId: 4,
    text: 'Мафіни з заварним кремом та горішками'
  },
  {  
    name: 'Десерт Павлова',
    imageUrl: '/b-4.png',
    categoryId: 4,
    text: 'Легкий десерт із хрусткої меренги, збитих вершків та свіжих ягід.'
  },
  {  
    name: 'Бельгійські вафлі',
    imageUrl: '/b-2.png',
    categoryId: 4,
    text: 'Золотисті вафлі з хрусткою скоринкою, які ідеально доповнюють солодкі сиропи.'
  },
  {  
    name: 'Opera Cake',
    imageUrl: '/b-6.png',
    categoryId: 4,
    text: 'Елегантний багатошаровий торт з кавово-шоколадним смаком.'
  },
  {  
    name: 'Зелений чай "Матча"',
    imageUrl: '/drink-1.png',
    categoryId: 5,
    text: 'Напій із тонким смаком, багатий антиоксидантами та енергією.'
  },
  {  
    name: 'Коктейль з морозивом та шоколадом',
    imageUrl: '/drink-2.png',
    categoryId: 5,
    text: 'Освіжаючий коктейль із насиченим шоколадним смаком та ніжним морозивом.'
  },
  {  
    name: 'Шоколад',
    imageUrl: '/drink-3.png',
    categoryId: 5,
    text: 'Гарячий шоколад із густою текстурою та насиченим ароматом какао.'
  },
  {  
    name: 'Банановий мокачино з вершками',
    imageUrl: '/drink-4.png',
    categoryId: 5,
    text: 'Кавовий напій з банановими нотками та вершковою шапочкою.'
  },
  {  
    name: 'Ніжний латте з корицею',
    imageUrl: '/drink-5.png',
    categoryId: 5,
    text: 'М’який латте з ароматом кориці, який зігріє вас у прохолодні дні.'
  },
  {  
    name: 'Бабл-ті',
    imageUrl: '/drink-6.png',
    categoryId: 5,
    text: 'Солодкий чай із фруктовими кульками, які додають незвичайного смаку.'
  },
  {  
    name: 'Пиріг з вишнями',
    imageUrl: '/desert-1.png',
    categoryId: 6,
    text: 'Домашній пиріг із соковитими вишнями та золотистою скоринкою.'
  },
  {  
    name: 'Вафельне морозиво',
    imageUrl: '/desert-2.png',
    categoryId: 6,
    text: 'Морозиво у хрусткому вафельному стаканчику для справжніх гурманів.'
  },
  {  
    name: 'Фондан з полуничним суфле',
    imageUrl: '/desert-3.png',
    categoryId: 6,
    text: 'Шоколадний фондан з ніжним полуничним центром, який тане у роті.'
  },
  {  
    name: 'Мокачо з вишнями',
    imageUrl: '/desert-4.png',
    categoryId: 6,
    text: 'Смачний десерт із насиченим смаком шоколаду та соковитими вишнями.'
  },
  {  
    name: 'Персикове тістечко',
    imageUrl: '/desert-5.png',
    categoryId: 6,
    text: 'Ніжне тістечко з ароматною персиковою начинкою та легкою глазур’ю.'
  },
  {  
    name: 'Tarte Tatin',
    imageUrl: '/desert-6.png',
    categoryId: 6,
    text: 'Французьке желе з фруктовим наповнювачем.'
  },
];
