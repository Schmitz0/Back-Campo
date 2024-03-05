const { Router } = require('express');
const midlewares = require('../middlewares');
const controllersSistemaLocales = require('../Controllers/sistemaLocales/index');
const controllersDashboard = require('../Controllers/dashboard/index');
const controllersWebClientes = require('../Controllers/webClientes/index');
const controllersBot = require('../Controllers/bot/index');
const userExtractor = require("../middlewares/userExtractor");

const router = Router();

//WEBCLIENTES ------------------------------

router.get('/number', controllersWebClientes.getLotteryNumbers);
router.post('/number', controllersWebClientes.addNumber);
router.post('/checkTicket',controllersWebClientes.checkTicket);

//DASHBOARD --------------------------------

router.get('/allclients/:id?', userExtractor, controllersDashboard.getDashboardClients);
router.post('/login', midlewares.loginValidation, controllersDashboard.login);
router.post('/user', midlewares.userValidation, controllersDashboard.createUser);
router.get('/user/:id?', controllersDashboard.getUser);
router.delete('/user/:id', controllersDashboard.deleteUser);
router.put('/user/:id', controllersDashboard.updateUser);
router.put('/user', controllersDashboard.updateOwnUser);
router.patch('/user/:id', controllersDashboard.enableUser);
router.put('/paymentOk/', controllersDashboard.paymentOk);
router.post('/paymentdashboard', controllersDashboard.payments);
router.post('/deposit', midlewares.paymentValidation, controllersDashboard.selfDeposit);
router.post('/extraction', midlewares.paymentValidation, controllersDashboard.selfExtraction);
router.get('/cashadmin', controllersDashboard.getCashAdmin);
router.delete('/cashadmin/:id', controllersDashboard.deleteCashAdmin);
router.patch('/gnc', controllersDashboard.tGNC);
router.get('/gncview', controllersDashboard.viewGNCT);
router.patch('/ticketAdmin/:id', controllersDashboard.patchStateTicketAdmin);
router.post('/postCashAdmin', controllersDashboard.postCashAdmin);

//SISTEMAS LOCALES -------------------------

// - CAJA - 

router.post('/payments',midlewares.paymentValidation, controllersSistemaLocales.payments)
router.post('/prize',midlewares.ticketExist, controllersSistemaLocales.payPrize);
router.get('/cash/:id?', controllersSistemaLocales.getCash);
router.post('/postCash/:id?', controllersSistemaLocales.postCash);

// - TICKET -

router.post('/ticket', midlewares.newTicketValidation, controllersSistemaLocales.newTicket);
router.patch('/ticket/:id', midlewares.patchTicketValidation, controllersSistemaLocales.patchStateTicket);
router.post('/allTicket', controllersSistemaLocales.getTickets);
router.post('/getTicketDate', controllersSistemaLocales.getTicketDate);
router.get('/getHotTickets',controllersSistemaLocales.getHotTickets)

// - CLIENT -

router.post('/client', userExtractor, controllersSistemaLocales.createClient);
router.get('/client/:id?', controllersSistemaLocales.getClients);
router.delete('/client/:id', userExtractor, controllersSistemaLocales.deleteClient);
router.put('/client/:id', controllersSistemaLocales.updateClient);

// - WHATSAPP -
router.post('/whatsapp-webhook', controllersSistemaLocales.urlWhatsapp);

//WEBCLIENTES ------------------------------

router.post('/getData',controllersBot.getData);

module.exports = router;
