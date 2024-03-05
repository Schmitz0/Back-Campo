const { catchedAsync } = require('../../utils');

module.exports = {
  getLotteryNumbers: catchedAsync(require('./getNumbers/lotteryNumbers')),
  checkTicket: catchedAsync(require('./checkTicket/checkTicket')),
  addNumber: catchedAsync(require('./webScaping/addNumber'))
};
