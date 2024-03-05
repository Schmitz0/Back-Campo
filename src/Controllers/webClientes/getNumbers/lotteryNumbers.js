const { response } = require('../../../utils');
const { Numbers } = require('../../../db');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const { date, nameLottery, hr } = req.query;
  let data = [];
  let numbers;
  let today = new Date();
  today.setHours(today.getHours() - 3);

  const dayOfWeek = today.getDay(); // 0 para domingo, 1 para lunes, 2 para martes, y así sucesivamente

  // Si es domingo (dayOfWeek === 0), la función no hará nada y simplemente saldrá.
  if (dayOfWeek === 0) {
  //dias de la semana
  numbers = [
    {
      number1: -1,
      number2: -1,
      number3: -1,
      hr: '09:00',
      page: 'https://anguillalottery.ai/es/',
      nameLottery: 'Anguilla',
      imageUrl:
        'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
        day:today,
    },

    {
      number1:-1,
      number2: -1,
      number3: -1,
      hr: '10:00',
      page: 'https://anguillalottery.ai/es/',
      nameLottery: 'Anguilla',
      imageUrl:
        'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
        day:today,
      },
    {
      number1:-1,
      number2: -1,
      number3: -1,
      hr: '11:00',
      page: 'https://anguillalottery.ai/es/',
      nameLottery: 'Anguilla',
      imageUrl:
        'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
        day:today,
    },

    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '12:00',
      page: 'https://laprimera.do/',
      nameLottery: 'La Primera Día',
      imageUrl:
        'https://laprimera.do/wp-content/uploads/2023/07/logo-la-primera.svg',
        day:today,
    },
    {
      number1:-1,
       number2:-1,
      number3:-1,
      hr: '12:30',
      page: 'https://www.conectate.com.do/loterias/la-suerte-dominicana',
      nameLottery: 'La Suerte Dominicana',
      imageUrl:
        'https://enloteria.com/assets/la_suerte-503a3d9314a080d132a414fdc5a6940ddd50ef1d235dcc621bc1bc7f7516fbb1.svg',
        day:today,
    },
    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '13:00',
      page: 'https://www.lotoreal.com.do/',
      nameLottery: 'Real',
      imageUrl:
        'https://enloteria.com/assets/real-eeb33736cd36eff0dfb219af8954fe0ab37245bd412801ea864f6a131c3c758c.svg',
        day:today,
    },
    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '13:55',
      page: 'https://lotedom.com/',
      nameLottery: 'LoteDom',
      imageUrl:
        'https://enloteria.com/assets/lotedom-9aae43273ce4d8d4d5429f6f57f2fadc54012eb96fc80d6f59cfb9b72576b7e9.svg',
        day:today,
    },
    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '14:30',
      page: 'https://www.conectate.com.do/loterias/americanas/florida-dia',
      nameLottery: 'Florida Tarde',
      imageUrl:
        'https://enloteria.com/assets/florida-0d3b11e2215473f987ac28c156cbff56ccf186e650ddf2df2b6b194254677eed.svg',
        day:today,
    }, //hola
    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '14:30',
      page: 'https://ganamas.com.do/loteria-gana-mas-resultados/',
      nameLottery: 'Gana Más',
      imageUrl:
        'https://enloteria.com/assets/ganamas-5c2fba8ccbe1a70b7b12afdf18ff38cfbf7ce032e5c7397dcb1f03e858ff4335.svg',
        day:today,
    },
    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '15:00',
      page: 'https://anguillalottery.ai/es/',
      nameLottery: 'Anguilla',
      imageUrl:
        'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
        day:today,
    },
    {
      number1:-1,
       number2:-1,
      number3:-1,
      hr: '15:30',
      page: 'https://www.conectate.com.do/loterias/americanas/new-york-medio-dia',
      nameLottery: 'New York Tarde',
      imageUrl:
        'https://enloteria.com/assets/new_york-e78bc3206a0497915ddab4a77f80e06ad0f8eb6d6e355770340c17be4f29a616.svg',
        day:today,
    },
    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '15:55',
      page: 'https://www.leidsa.com/',
      nameLottery: 'Leidsa',
      imageUrl:
        'https://enloteria.com/assets/leidsa-26031367f0cd9ba743253bbae1c55e546de6732adf18eda71c73d4387c0da2d1.svg',
        day:today,
    },
    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '16:00',
      page: 'https://anguillalottery.ai/es/',
      nameLottery: 'Anguilla',
      imageUrl:
        'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
        day:today,
    },
    {
      number1:-1,
       number2:-1,
      number3:-1,
      hr: '17:00',
      page: 'https://anguillalottery.ai/es/',
      nameLottery: 'Anguilla',
      imageUrl:
        'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
        day:today,
    },
    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '18:00',
      page: 'https://anguillalottery.ai/es/',
      nameLottery: 'Anguilla',
      imageUrl:
        'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
        day:today,
    },

    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '18:00',
      page: 'https://www.conectate.com.do/loterias/nacional/quiniela',
      nameLottery: 'Nacional',
      imageUrl:
        'https://enloteria.com/assets/nacional-6f4e8ccd25d07edb6452e418cbfab9ae8ec36f728266fc7189a6ee68e7bdd4f0.svg',
        day:today,
    }, 

    {
      number1:-1,
       number2:-1,
      number3:-1,
      hr: '18:00',
      page: 'https://www.conectate.com.do/loterias/la-suerte-dominicana',
      nameLottery: 'La Suerte Dominicana',
      imageUrl:
        'https://enloteria.com/assets/la_suerte-503a3d9314a080d132a414fdc5a6940ddd50ef1d235dcc621bc1bc7f7516fbb1.svg',
        day:today,
    },

    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '19:00',
      page: 'https://anguillalottery.ai/es/',
      nameLottery: 'Anguilla',
      imageUrl:
        'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
        day:today,
    }, //hola
    {
      number1:-1,
       number2:-1,
      number3:-1,
      hr: '20:00',
      page: 'https://laprimera.do/',
      nameLottery: 'La Primera Noche',
      imageUrl:
        'https://laprimera.do/wp-content/uploads/2023/07/logo-la-primera.svg',
        day:today,
    },
    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '19:55',
      page: 'https://loteka.com.do/',
      nameLottery: 'Loteka',
      imageUrl:
        'https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/focusgn.com/latinoamerica/wp-content/uploads/sites/2/2023/04/megachance-loteka.jpg',
        day:today,
      },



    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '22:00',
      page: 'https://anguillalottery.ai/es/',
      nameLottery: 'Anguilla',
      imageUrl:
        'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
        day:today,
    },
    {
      number1:-1,
      number2:-1,
      number3:-1,
      hr: '22:45',
      page: 'https://www.conectate.com.do/loterias/americanas/florida-noche',
      nameLottery: 'Florida Noche',
      imageUrl:
        'https://enloteria.com/assets/florida-0d3b11e2215473f987ac28c156cbff56ccf186e650ddf2df2b6b194254677eed.svg',
        day:today,
    },
    {
      number1:-1,
       number2:-1,
      number3:-1,
      hr: '23:30',
      page: 'https://www.conectate.com.do/loterias/americanas/new-york-noche',
      nameLottery: 'New York Noche',
      imageUrl:
        'https://enloteria.com/assets/new_york-e78bc3206a0497915ddab4a77f80e06ad0f8eb6d6e355770340c17be4f29a616.svg',
        day:today,
    },
  ];
  } else {
      //dias de la semana
  numbers = [
  {
    number1: -1,
    number2: -1,
    number3: -1,
    hr: '09:00',
    page: 'https://anguillalottery.ai/es/',
    nameLottery: 'Anguilla',
    imageUrl:
      'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
      day:today,
  },

  {
    number1:-1,
    number2: -1,
    number3: -1,
    hr: '10:00',
    page: 'https://anguillalottery.ai/es/',
    nameLottery: 'Anguilla',
    imageUrl:
      'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
      day:today,
    },
  {
    number1:-1,
    number2: -1,
    number3: -1,
    hr: '11:00',
    page: 'https://anguillalottery.ai/es/',
    nameLottery: 'Anguilla',
    imageUrl:
      'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
      day:today,
  },

  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '12:00',
    page: 'https://laprimera.do/',
    nameLottery: 'La Primera Día',
    imageUrl:
      'https://laprimera.do/wp-content/uploads/2023/07/logo-la-primera.svg',
      day:today,
  },
  {
    number1:-1,
     number2:-1,
    number3:-1,
    hr: '12:30',
    page: 'https://www.conectate.com.do/loterias/la-suerte-dominicana',
    nameLottery: 'La Suerte Dominicana',
    imageUrl:
      'https://enloteria.com/assets/la_suerte-503a3d9314a080d132a414fdc5a6940ddd50ef1d235dcc621bc1bc7f7516fbb1.svg',
      day:today,
  },
  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '13:00',
    page: 'https://www.lotoreal.com.do/',
    nameLottery: 'Real',
    imageUrl:
      'https://enloteria.com/assets/real-eeb33736cd36eff0dfb219af8954fe0ab37245bd412801ea864f6a131c3c758c.svg',
      day:today,
  },
  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '13:55',
    page: 'https://lotedom.com/',
    nameLottery: 'LoteDom',
    imageUrl:
      'https://enloteria.com/assets/lotedom-9aae43273ce4d8d4d5429f6f57f2fadc54012eb96fc80d6f59cfb9b72576b7e9.svg',
      day:today,
  },
  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '14:30',
    page: 'https://www.conectate.com.do/loterias/americanas/florida-dia',
    nameLottery: 'Florida Tarde',
    imageUrl:
      'https://enloteria.com/assets/florida-0d3b11e2215473f987ac28c156cbff56ccf186e650ddf2df2b6b194254677eed.svg',
      day:today,
  }, //hola
  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '14:30',
    page: 'https://ganamas.com.do/loteria-gana-mas-resultados/',
    nameLottery: 'Gana Más',
    imageUrl:
      'https://enloteria.com/assets/ganamas-5c2fba8ccbe1a70b7b12afdf18ff38cfbf7ce032e5c7397dcb1f03e858ff4335.svg',
      day:today,
  },
  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '15:00',
    page: 'https://anguillalottery.ai/es/',
    nameLottery: 'Anguilla',
    imageUrl:
      'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
      day:today,
  },
  {
    number1:-1,
     number2:-1,
    number3:-1,
    hr: '15:30',
    page: 'https://www.conectate.com.do/loterias/americanas/new-york-medio-dia',
    nameLottery: 'New York Tarde',
    imageUrl:
      'https://enloteria.com/assets/new_york-e78bc3206a0497915ddab4a77f80e06ad0f8eb6d6e355770340c17be4f29a616.svg',
      day:today,
  },
  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '16:00',
    page: 'https://anguillalottery.ai/es/',
    nameLottery: 'Anguilla',
    imageUrl:
      'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
      day:today,
  },
  {
    number1:-1,
     number2:-1,
    number3:-1,
    hr: '17:00',
    page: 'https://anguillalottery.ai/es/',
    nameLottery: 'Anguilla',
    imageUrl:
      'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
      day:today,
  },
  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '18:00',
    page: 'https://anguillalottery.ai/es/',
    nameLottery: 'Anguilla',
    imageUrl:
      'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
      day:today,
  },

  {
    number1:-1,
     number2:-1,
    number3:-1,
    hr: '18:00',
    page: 'https://www.conectate.com.do/loterias/la-suerte-dominicana',
    nameLottery: 'La Suerte Dominicana',
    imageUrl:
      'https://enloteria.com/assets/la_suerte-503a3d9314a080d132a414fdc5a6940ddd50ef1d235dcc621bc1bc7f7516fbb1.svg',
      day:today,
  },

  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '19:00',
    page: 'https://anguillalottery.ai/es/',
    nameLottery: 'Anguilla',
    imageUrl:
      'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
      day:today,
  }, 

  

  {
    number1:-1,
     number2:-1,
    number3:-1,
    hr: '20:00',
    page: 'https://laprimera.do/',
    nameLottery: 'La Primera Noche',
    imageUrl:
      'https://laprimera.do/wp-content/uploads/2023/07/logo-la-primera.svg',
      day:today,
  },
  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '19:55',
    page: 'https://loteka.com.do/',
    nameLottery: 'Loteka',
    imageUrl:
      'https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/focusgn.com/latinoamerica/wp-content/uploads/sites/2/2023/04/megachance-loteka.jpg',
      day:today,
    },

  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '20:55',
    page: 'https://www.leidsa.com/',
    nameLottery: 'Leidsa',
    imageUrl:
      'https://enloteria.com/assets/leidsa-26031367f0cd9ba743253bbae1c55e546de6732adf18eda71c73d4387c0da2d1.svg',
      day:today,
  },
  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '21:00',
    page: 'https://www.conectate.com.do/loterias/nacional/quiniela',
    nameLottery: 'Nacional',
    imageUrl:
      'https://enloteria.com/assets/nacional-6f4e8ccd25d07edb6452e418cbfab9ae8ec36f728266fc7189a6ee68e7bdd4f0.svg',
      day:today,
  }, 
  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '22:00',
    page: 'https://anguillalottery.ai/es/',
    nameLottery: 'Anguilla',
    imageUrl:
      'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
      day:today,
  },
  {
    number1:-1,
    number2:-1,
    number3:-1,
    hr: '22:45',
    page: 'https://www.conectate.com.do/loterias/americanas/florida-noche',
    nameLottery: 'Florida Noche',
    imageUrl:
      'https://enloteria.com/assets/florida-0d3b11e2215473f987ac28c156cbff56ccf186e650ddf2df2b6b194254677eed.svg',
      day:today,
  },
  {
    number1:-1,
     number2:-1,
    number3:-1,
    hr: '23:30',
    page: 'https://www.conectate.com.do/loterias/americanas/new-york-noche',
    nameLottery: 'New York Noche',
    imageUrl:
      'https://enloteria.com/assets/new_york-e78bc3206a0497915ddab4a77f80e06ad0f8eb6d6e355770340c17be4f29a616.svg',
      day:today,
  },
];
  }


  if (date) {

    // Parsear la fecha enviada desde el frontend
    const parsedDate = new Date(date);
    parsedDate.setUTCHours(0, 0, 0, 0);
    
    const endOfDay = new Date(parsedDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    data = await Numbers.findAll({
      where: {
        day: {
          [Op.between]: [parsedDate, endOfDay],
        },
      },
      order: [['day', 'DESC']],
    });

    
      for (let i = 0; i < data.length; i++) {
        const lotteryName = data[i].nameLottery;
        const hrName = data[i].hr;
    
        // Busca el índice en el array de objetos 'numbers' donde coincida el 'nameLottery'
        const index = numbers.findIndex(
          (number) => number.nameLottery === lotteryName && number.hr === hrName
        );
    
        if (index !== -1) {
          // Si se encontró una coincidencia, actualiza los números
          numbers[index].number1 = data[i].number1;
          numbers[index].number2 = data[i].number2;
          numbers[index].number3 = data[i].number3;
        }
      }

      return response(res, 200, numbers);
  }

  if (nameLottery) { 
      data = await Numbers.findAll({
        where: {
          nameLottery,
          hr,
        },
        order: [['day', 'DESC']], // Ordenar por createdAt (cambia a tu campo de horario)
        limit: 10, 
      });

      // const numbersFilter = [
      //   {
      //     number1: -1,
      //     number2: -1,
      //     number3: -1,
      //     hr: '09:00',
      //     page: 'https://anguillalottery.ai/es/',
      //     nameLottery: 'Anguilla',
      //     imageUrl:
      //       'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
      //       day:today,
      //   },
    
      //   {
      //     number1:-1,
      //     number2: -1,
      //     number3: -1,
      //     hr: '10:00',
      //     page: 'https://anguillalottery.ai/es/',
      //     nameLottery: 'Anguilla',
      //     imageUrl:
      //       'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
      //       day:today,
      //     },
      //   {
      //     number1:-1,
      //     number2: -1,
      //     number3: -1,
      //     hr: '11:00',
      //     page: 'https://anguillalottery.ai/es/',
      //     nameLottery: 'Anguilla',
      //     imageUrl:
      //       'https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png',
      //       day:today,
      //   },
    
      //   {
      //     number1:-1,
      //     number2:-1,
      //     number3:-1,
      //     hr: '12:00',
      //     page: 'https://laprimera.do/',
      //     nameLottery: 'La Primera Día',
      //     imageUrl:
      //       'https://laprimera.do/wp-content/uploads/2023/07/logo-la-primera.svg',
      //       day:today,
      //   },
      //   {
      //     number1:-1,
      //      number2:-1,
      //     number3:-1,
      //     hr: '12:30',
      //     page: 'https://www.conectate.com.do/loterias/la-suerte-dominicana',
      //     nameLottery: 'La Suerte Dominicana',
      //     imageUrl:
      //       'https://enloteria.com/assets/la_suerte-503a3d9314a080d132a414fdc5a6940ddd50ef1d235dcc621bc1bc7f7516fbb1.svg',
      //       day:today,
      //   },
      //   {
      //     number1:-1,
      //     number2:-1,
      //     number3:-1,
      //     hr: '13:00',
      //     page: 'https://www.lotoreal.com.do/',
      //     nameLottery: 'Real',
      //     imageUrl:
      //       'https://enloteria.com/assets/real-eeb33736cd36eff0dfb219af8954fe0ab37245bd412801ea864f6a131c3c758c.svg',
      //       day:today,
      //   },
      //   {
      //     number1:-1,
      //     number2:-1,
      //     number3:-1,
      //     hr: '13:55',
      //     page: 'https://lotedom.com/',
      //     nameLottery: 'LoteDom',
      //     imageUrl:
      //       'https://enloteria.com/assets/lotedom-9aae43273ce4d8d4d5429f6f57f2fadc54012eb96fc80d6f59cfb9b72576b7e9.svg',
      //       day:today,
      //   },
      //   {
      //     number1:-1,
      //     number2:-1,
      //     number3:-1,
      //     hr: '14:30',
      //     page: 'https://www.conectate.com.do/loterias/americanas/florida-dia',
      //     nameLottery: 'Florida Tarde',
      //     imageUrl:
      //       'https://enloteria.com/assets/florida-0d3b11e2215473f987ac28c156cbff56ccf186e650ddf2df2b6b194254677eed.svg',
      //       day:today,
      //   }, //hola
      //   {
      //     number1:-1,
      //     number2:-1,
      //     number3:-1,
      //     hr: '14:30',
      //     page: 'https://ganamas.com.do/loteria-gana-mas-resultados/',
      //     nameLottery: 'Gana Más',
      //     imageUrl:
      //       'https://enloteria.com/assets/ganamas-5c2fba8ccbe1a70b7b12afdf18ff38cfbf7ce032e5c7397dcb1f03e858ff4335.svg',
      //       day:today,
      //   },
      //   {
      //     number1:-1,
      //      number2:-1,
      //     number3:-1,
      //     hr: '15:30',
      //     page: 'https://www.conectate.com.do/loterias/americanas/new-york-medio-dia',
      //     nameLottery: 'New York Tarde',
      //     imageUrl:
      //       'https://enloteria.com/assets/new_york-e78bc3206a0497915ddab4a77f80e06ad0f8eb6d6e355770340c17be4f29a616.svg',
      //       day:today,
      //   },
      // ];

      // for (let i = 0; i < data.length; i++) {
      //   const lotteryName = data[i].nameLottery;
      //   const hrName = data[i].hr;
      //   const imageUrl = data[i].imageUrl;
      //   const page = data[i].page;
    
      //   // Busca el índice en el array de objetos 'numbers' donde coincida el 'nameLottery'
      //   const index = numbersFilter.findIndex(
      //     (number) => number.nameLottery === lotteryName && number.hr === hrName
      //   );
    
      //   if (index !== -1) {
      //     // Si se encontró una coincidencia, actualiza los números
      //     numbersFilter[index].number1 = data[i].number1;
      //     numbersFilter[index].number2 = data[i].number2;
      //     numbersFilter[index].number3 = data[i].number3;
      //     numbersFilter[index].imageUrl = data[i].imageUrl;
      //     numbersFilter[index].page = data[i].page;
      //     numbersFilter[index].hr = data[i].hr;
      //     numbersFilter[index].nameLottery = data[i].nameLottery
      //   }
      // }



      return response(res, 200, data);
  }

};
