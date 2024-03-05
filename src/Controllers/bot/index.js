const { catchedAsync } = require('../../utils');

module.exports = {
    getData: catchedAsync(require('./data/postData')),
  };