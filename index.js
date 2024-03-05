require('dotenv').config();
const bcrypt = require('bcrypt');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;
const cron = require('node-cron');
const { cronTasks } = require('./src/Controllers/webClientes/webScaping/objectCronTasks.js');
const { User, Numbers, LotteryName, LotteryHr, Client, CommissionPercentage, Prize } = require('./src/db.js');
process.env.TZ = 'America/Argentina/Buenos_Aires';

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running...`);
    
    cronTasks.forEach(({ pattern, func }, index) => {
      cron.schedule(pattern, () => {
        console.log(`Ejecutando tarea numero ${index + 1}`);
        func(); 
      });
    });

    const user = [
      {
        name: 'Erick Guerrero',
        email: 'erick-guerrero@outlook.com.pe',
        hashPassword:'$2b$08$qLE41lkl/biCr/6o5caAMuLG0vtMyoaT.4TstpSeXOmJN8ZbZVus6',
        dni: 11111111,
        businessName:'Admin',
        ownerPhone:"51957239759",
        phoneYAPE: "51957239759",
        phonePLIN: "51957239759",
        bankAccount1: 76837246,
        bankAccount2: 12344535,
        address: "Capital Federal 535",
        urbanization: "Republica Dominicana",
        district: "Distrito Nacional",
        province: "Santo Domingo",
        department: "Santo Domingo",
        enable: true,
        role: 'Admin',
        salesCommissionPercentage: 8,
        paymentCommissionPercentage: 4,
        firstPrize: 30,
        SecondPrize: 20,
        ThirdPrize: 10,
      }]
//       {
//         name: 'Usuario',
//         email: 'usuario@gmail.com',
//         hashPassword:'$2b$08$qLE41lkl/biCr/6o5caAMuLG0vtMyoaT.4TstpSeXOmJN8ZbZVus6',
//         dni: 11111111,
//         phoneYAPE: "51957239759",
//         phonePLIN: "51957239759",
//         bankAccount1: 76837246,
//         bankAccount2: 12344535,
//         address: "Capital Federal 535",
//         urbanization: "Republica Dominicana",
//         district: "Distrito Nacional",
//         province: "Santo Domingo",
//         department: "Santo Domingo",
//         enable: true,
//         role: 'User',
//         salesCommissionPercentage: 8,
//         paymentCommissionPercentage: 4,
//         firstPrize: 30,
//         SecondPrize: 20,
//         ThirdPrize: 10,
//       },
//       {
//         name: 'Gaston Schmitz',
//         email: 'gastonschmitz0@gmail.com',
//         hashPassword:'$2b$08$qLE41lkl/biCr/6o5caAMuLG0vtMyoaT.4TstpSeXOmJN8ZbZVus6',
//         dni: 33446820,
//         phoneYAPE: "1165417817",
//         phonePLIN: "1165417817",
//         bankAccount1: 76837246,
//         bankAccount2: 12344535,
//         address: "Capital Federal 535",
//         urbanization: "Argentina",
//         district: "Cordoba",
//         province: "Cordoba",
//         department: "Cordoba",
//         enable: true,
//         role: 'Admin',
//         salesCommissionPercentage: 8,
//         paymentCommissionPercentage: 4,
//         firstPrize: 30,
//         SecondPrize: 20,
//         ThirdPrize: 10,
//       },
//       {
//         name: 'Cosme Fulanito',
//         email: 'cosme_fulanito@gmail.com',
//         hashPassword:'$2b$08$EtUeekkUa6bOQKP904gCKeWYyuJH7ssTdcfPoJdrjJR2pIupPm01G',
//         dni: 33446820,
//         phoneYAPE: "1165417817",
//         phonePLIN: "1165417817",
//         bankAccount1: 76837246,
//         bankAccount2: 12344535,
//         address: "Capital Federal 535",
//         urbanization: "Argentina",
//         district: "Cordoba",
//         province: "Cordoba",
//         department: "Cordoba",
//         enable: true,
//         role: 'Admin',
//         salesCommissionPercentage: 8,
//         paymentCommissionPercentage: 4,
//         firstPrize: 30,
//         SecondPrize: 20,
//         ThirdPrize: 10,
//       },
//     ];

//     // const today = new Date('2023-11-24');
//     const today = new Date();

//     const client = [
//       {
//         name: 'David',
//         surname: 'BisBal',
//         email: 'db@gmail.com',
//         phone: '54911654178711',
//         genre: "M",
//         birthDate: '1998-07-01',
//         userId: 2,
//       },
//       {
//         name: 'Martin',
//         surname: 'Vero',
//         email: 'mv@gmail.com',
//         phone: '5491165417871',
//         genre: "M",
//         birthDate: '1998-07-01',
//         userId: 2,
//       },
//       {
//         name: 'Erick',
//         surname: 'Guerrero',
//         email: '',
//         phone: '51957239759',
//         genre: "M",
//         birthDate: '1998-06-30',
//         userId: 2,
//       },
//       {
//         name: 'Adrian',
//         surname: 'Guerrero',
//         email: '',
//         phone: '51945247890',
//         genre: "M",
//         birthDate: '1998-06-30',
//         userId: 2,
//       },
//     ];

//     const numbers = [
//       {
//       number1:1,
//       number2:2,
//       number3:3,
//       page:'https://lotedom.com/',
//       nameLottery:'LoteDom',
//       hr:"13:55",
//       imageUrl:'https://enloteria.com/assets/lotedom-9aae43273ce4d8d4d5429f6f57f2fadc54012eb96fc80d6f59cfb9b72576b7e9.svg',
//       day:today,
//       },
//       {
//       number1:11,
//       number2:22,
//       number3:33,
//       page:'https://anguillalottery.ai/es/',
//       nameLottery:'Anguilla',
//       hr:"09:00",
//       imageUrl:"https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png",
//       day:today,
//       },
//       {
//       number1:1,
//       number2:22,
//       number3:6,
//       page:'https://lotedom.com/',
//       nameLottery:'Anguilla',
//       hr:"11:00",
//       imageUrl:'https://enloteria.com/assets/lotedom-9aae43273ce4d8d4d5429f6f57f2fadc54012eb96fc80d6f59cfb9b72576b7e9.svg',
//       day:today,
//       },
//       {
//       number1:10,
//       number2:25,
//       number3:36,
//       page:'https://anguillalottery.ai/es/',
//       nameLottery:'Anguilla',
//       hr:"10:00",
//       imageUrl:"https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png",
//       day:today,
//       }
//     ]

// //     const numbers = [
// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 35,
// //         hr:"9:00",
// //         page:"https://anguillalottery.ai/es/",
// //         nameLottery:'Anguilla',
// //         imageUrl:"https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png",
// //         day:"2023-11-09T00:00:00.000Z",
// //       },
     
// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 46,
// //         hr:"11:00",
// //         page:"https://anguillalottery.ai/es/",
// //         nameLottery:'Anguilla',
// //         imageUrl:"https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png",
// //         day:"2023-11-09T00:00:00.000Z",
// //       }, 
// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 23,
// //         hr:"10:00",
// //         page:"https://anguillalottery.ai/es/",
// //         nameLottery:'Anguilla',
// //         imageUrl:"https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 97,
// //         hr:"12:00",
// //         page:"https://laprimera.do/",
// //         nameLottery:'La Primera Dia',
// //         imageUrl:"https://laprimera.do/wp-content/uploads/2023/07/logo-la-primera.svg",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,

// // number2:0,
// //         number3: 35,
// //         hr:"12:30",
// //         page:"https://anguillalottery.ai/es/",
// //         nameLottery:'La Suerte Dominicana',
// //         imageUrl:"https://enloteria.com/assets/la_suerte-503a3d9314a080d132a414fdc5a6940ddd50ef1d235dcc621bc1bc7f7516fbb1.svg",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 23,
// //         hr:"13:00",
// //         page:"https://www.lotoreal.com.do/",
// //         nameLottery:'Real',
// //         imageUrl:"https://enloteria.com/assets/real-eeb33736cd36eff0dfb219af8954fe0ab37245bd412801ea864f6a131c3c758c.svg",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 46,
// //         hr:"14:30",
// //         page:"https://www.conectate.com.do/loterias/americanas/florida-dia",
// //         nameLottery:'Florida Tarde',
// //         imageUrl:"https://enloteria.com/assets/florida-0d3b11e2215473f987ac28c156cbff56ccf186e650ddf2df2b6b194254677eed.svg",
// //               day:"2023-11-09T00:00:00.000Z"},
// //        //hola
// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 97,
// //         hr:"13:55",
// //         page:"https://lotedom.com/",
// //         nameLottery:'Lotedom',
// //         imageUrl:"https://enloteria.com/assets/lotedom-9aae43273ce4d8d4d5429f6f57f2fadc54012eb96fc80d6f59cfb9b72576b7e9.svg"  , 
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 35,
// //         hr:"15:30",
// //         page:"https://www.conectate.com.do/loterias/americanas/new-york-medio-dia",
// //         nameLottery:'New York Tarde',
// //         imageUrl:"https://cdn-lottery.kiskoo.com/loterias-dominicanas/loteria-new-york-tarde.png",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 23,
// //         hr:"14:30",
// //         page:"https://ganamas.com.do/loteria-gana-mas-resultados/",
// //         nameLottery:'Gana mas',
// //         imageUrl:"https://ganamas.com.do/wp-content/uploads/2023/03/cropped-LOGO-GANAS-MAS-1-2048x758.png",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 46,
// //         hr:"15:30",
// //         page:"https://anguillalottery.ai/es/",
// //         nameLottery:'Anguilla',
// //         imageUrl:"https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png",
// //               day:"2023-11-09T00:00:00.000Z"},
// //        //hola
// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 97,
// //         hr:"16:00",
// //         page:"https://anguillalottery.ai/es/",
// //         nameLottery:'Anguilla',
// //         imageUrl:"https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,

// // number2:0,
// //         number3: 35,
// //         hr:"17:00",
// //         page:"https://anguillalottery.ai/es/",
// //         nameLottery:'Anguilla',
// //         imageUrl:"https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 23,
// //         hr:"18:00",
// //         page:"https://anguillalottery.ai/es/",
// //         nameLottery:'Anguilla',
// //         imageUrl:"https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 46,
// //         hr:"19:00",
// //         page:"https://anguillalottery.ai/es/",
// //         nameLottery:'Anguilla',
// //         imageUrl:"https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png",
// //               day:"2023-11-09T00:00:00.000Z"},
// //        //hola
// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 97,
// //         hr:"19:55",
// //         page:"https://loteka.com.do/",
// //         nameLottery:'Loteka',
// //         imageUrl:"https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/focusgn.com/latinoamerica/wp-content/uploads/sites/2/2023/04/megachance-loteka.jpg",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,

// // number2:0,
// //         number3: 35,
// //         hr:"20:00",
// //         page:"https://laprimera.do/",
// //         nameLottery:'La Primera Noche',
// //         imageUrl:"https://laprimera.do/wp-content/uploads/2023/07/logo-la-primera.svg",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 23,
// //         // si es domingo es las 15:55 si no es a las 20:55
// //         hr:"20:55",
// //         page:"https://www.leidsa.com/",
// //         nameLottery:'Leidsa',
// //                 day:"2023-11-09T00:00:00.000Z",
// //         imageUrl:"https://enloteria.com/assets/leidsa-26031367f0cd9ba743253bbae1c55e546de6732adf18eda71c73d4387c0da2d1.svg",
// //       },
// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 46,
// //         // si es domingo es las 18 si no es a las 21
// //         hr:"18:00",
// //         page:"https://www.conectate.com.do/loterias/nacional/quiniela",
// //         nameLottery:'Nacional',
// //                 day:"2023-11-09T00:00:00.000Z",
// //         imageUrl:"https://enloteria.com/assets/nacional-6f4e8ccd25d07edb6452e418cbfab9ae8ec36f728266fc7189a6ee68e7bdd4f0.svg",
// //       }, //hola
// //       {
// //         number1: 0,
// // number2:0,
// //         number3: 97,
// //         hr:"22:00",
// //         page:"https://anguillalottery.ai/es/",
// //         nameLottery:'Anguilla',
// //         imageUrl:"https://anguillalottery.ai/wp-content/themes/madroka/images/logofooter.png",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,

// // number2:0,
// //         number3: 35,
// //         hr:"23:30",
// //         page:"https://www.conectate.com.do/loterias/americanas/new-york-noche",
// //         nameLottery:'New York Noche',
// //         imageUrl:"https://enloteria.com/assets/new_york-e78bc3206a0497915ddab4a77f80e06ad0f8eb6d6e355770340c17be4f29a616.svg",
// //               day:"2023-11-09T00:00:00.000Z"},

// //       {
// //         number1: 0,
// //         number2:0,
// //         number3: 23,
// //         hr:"22:45",
// //         page:"https://www.conectate.com.do/loterias/americanas/florida-noche",
// //         nameLottery:'Florida Noche',
// //         imageUrl:"https://enloteria.com/assets/florida-0d3b11e2215473f987ac28c156cbff56ccf186e650ddf2df2b6b194254677eed.svg",
// //               day:"2023-11-09T00:00:00.000Z"},

// //     ];

//     // const lotteryName = [{
//     //   lottery:"Anguilla",
//     //   lottery:'La Primera dia',
//     //   lottery:'Leidsa',
//     //   lottery:'Nacional',
//     //   lottery:'La Primera Noche',
//     //   lottery:'Loteka',
//     //   lottery:'Florida Noche',
//     //   lottery:'Gana mas',
//     //   lottery:'New York Tarde',
//     //   lottery:'Lotedom',
//     //   lottery:'Florida Tarde',
//     //   lottery:'Real',
//     //   lottery:'La Suerte Dominicana',
//     // }]

//     // const lotteryHr = [{
//     //   hr:"09:00",
//     //   hr:"10:00",
//     //   hr:"11:00",
//     //   hr:"12:00",
//     //   hr:"12:30",
//     //   hr:"13:00",
//     //   hr:"13:30",
//     //   hr:"13:55",
//     //   hr:"14:00",
//     //   hr:"14:30",
//     //   hr:"15:00",
//     //   hr:"15:30",
//     //   hr:"16:00",
//     //   hr:"17:00",
//     //   hr:"18:00",
//     //   hr:"19:00",
//     //   hr:"19:55",
//     //   hr:"20:00",
//     //   hr:"20:55",
//     //   hr:"21:00",
//     //   hr:"22:00",
//     //   hr:"23:00",
//     //   hr:"23:30",
//     //   hr:"22:45",      
//     // }]

//     // const tickets = [
//     //   {
//     //     userId:2,
//     //     apuestas:[
//     //       {
//     //     number:[2,3,12],
//     //     bet:[155,1,23],
//     //     hr:"11",
//     //     lottery:"Anguilla",
//     //     clientId:1
//     //     },
//     //     ]
//     //   }
//     // ]

//     const comisiones = [
//       {
//         salesCommissionPercentage: 8,
//         paymentCommissionPercentage: 9,
//         userId: 1
//       },
//       {
//         salesCommissionPercentage: 4,
//         paymentCommissionPercentage: 5,
//         userId: 2
//       },
//       {
//         salesCommissionPercentage: 4,
//         paymentCommissionPercentage: 5,
//         userId: 3
//       }
//     ]


//     const prize = [
//       {
//         firstPrize: 3,
//         SecondPrize: 2,
//         ThirdPrize:1,
//         userId: 1
//       },
//       {
//         firstPrize: 34,
//         SecondPrize: 22,
//         ThirdPrize:11,
//         userId: 2
//       },
//       {
//         firstPrize: 34,
//         SecondPrize: 22,
//         ThirdPrize:11,
//         userId: 3
//       }
//     ]

    User.bulkCreate(user).then(() => console.log("Usuarios cargados"));
//     CommissionPercentage.bulkCreate(comisiones).then(() => console.log("Comisiones"));
//     Prize.bulkCreate(prize).then(() => console.log("Prize"));
//     Client.bulkCreate(client).then(() => console.log("Clientes cargados"));
//     Numbers.bulkCreate(numbers).then(() => console.log("Numeros cargados"));
    // LotteryHr.bulkCreate(lotteryHr).then(() => console.log("Hr cargados"));
    // LotteryName.bulkCreate(lotteryName).then(() => console.log("Name cargados"));
  });
});
