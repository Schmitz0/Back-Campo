const { Numbers } = require('../../../db');
const response = require('../../../utils/response');


module.exports = async (req, res) => {
  const {
    number1,
    number2,
    number3,
    hr,
    page,
    nameLottery,
    imageUrl,
    day,
} = req.body;

const formatedDay = new Date(day)

  const user = await Numbers.create({
    number1,
    number2,
    number3,
    hr,
    page,
    nameLottery,
    imageUrl,
    day: formatedDay,
  });

  response(res, 200, user);
};


    // "number1":1,
    // "number2":2,
    // "number3":3,
    // "hr":"11:00",
    // "page":"",
    // "nameLottery":"Anguilla",
    // "imageUrl":"",
    // "day":"2024/01/15"