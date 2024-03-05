const accountSid = 'ACd6227b3d669e2b98349bc1396076f79b';
const authToken = '4e16910247f59e5921b94c89115b5fdf';
const client = require('twilio')(accountSid, authToken);

const x = 100

client.messages
    .create({
        body: `Your appointment is coming up on July 21 at 3PM
        seguimso asu
        100 de estos ${x}`,
        from: 'whatsapp:+18652720366',
        to: 'whatsapp:+5491165417871'
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error(error));

// const { Client } = require('whatsapp-web.js');

// const client = new Client();

// client.on('qr', (qr) => {
//     // Generate and scan this code with your phone
//     console.log('QR RECEIVED', qr);
// });

// client.on('ready', () => {
//     console.log('Client is ready!');
    
//     // En este punto, el cliente está listo para enviar mensajes
//     const chatId = 'whatsapp:+5491165417871'; // Reemplaza con el número de WhatsApp al que deseas enviar el mensaje
//     const message = 'Hola, este es un mensaje de prueba desde WhatsApp Web.js';

//     client.sendMessage(chatId, message).then((message) => {
//         console.log(`Mensaje enviado con éxito: ${message.id}`);
//     }).catch((error) => {
//         console.error(`Error al enviar el mensaje: ${error}`);
//     });
// });

// client.initialize();



