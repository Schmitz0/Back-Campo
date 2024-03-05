const { catchedAsync } = require('../../utils');

module.exports = {
    login: catchedAsync(require('./login/login')),
    createUser: catchedAsync(require('./user/createUser')),
    getUser: catchedAsync(require('./user/getUser')),
    deleteUser: catchedAsync(require('./user/deleteUser')),
    updateUser: catchedAsync(require('./user/updateUser')),
    updateOwnUser: catchedAsync(require('./user/updateOwnUser')),
    enableUser: catchedAsync(require('./user/enableUser')),
    getDashboardClients: catchedAsync(require('./dashboardClients/getDashboardClients')),
    paymentOk: catchedAsync(require('./cash/paymentOk')),
    payments: catchedAsync(require('./cash/payments')),
    selfDeposit: catchedAsync(require('./cash/selfDeposit')),
    selfExtraction: catchedAsync(require('./cash/selfExtraction')),
    getCashAdmin: catchedAsync(require('./cash/getCashAdmin')),
    deleteCashAdmin: catchedAsync(require('./cash/deleteCashAdmin')),
    tGNC: catchedAsync(require('./ticket/tGNC')),
    viewGNCT: catchedAsync(require('./ticket/viewGNCT')),
    patchStateTicketAdmin: catchedAsync(require('./ticket/patchStateTicket')),
    postCashAdmin:catchedAsync(require('./cash/postCashAdmin')),
  };