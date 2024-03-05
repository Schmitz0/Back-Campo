const { catchedAsync } = require('../../utils');

module.exports = {
    newTicket: catchedAsync(require('./tickets/newTicket')),
    getTickets: catchedAsync(require('./tickets/getTickets')),
    patchStateTicket: catchedAsync(require('./tickets/patchStateTicket')),
    getClients: catchedAsync(require('./client/getClients')),
    createClient: catchedAsync(require('./client/createClient')),
    deleteClient: catchedAsync(require('./client/deleteClient')),
    updateClient: catchedAsync(require('./client/updateClient')),
    getCash: catchedAsync(require('./cash/getCash')),
    urlWhatsapp:catchedAsync(require('./whatsapp/urlWhatsapp')),
    getHotTickets:catchedAsync(require('./tickets/getHotTickets')),
    payPrize:catchedAsync(require('./prize/payPrize')),
    payments:catchedAsync(require('./cash/payments')),
    postCash: catchedAsync(require('./cash/postCash')),
    getTicketDate: catchedAsync(require('./tickets/getTicketDate')),
  };