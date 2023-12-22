const generateId = require('../../utils/generateId');

const analytics = (event, params = null, error = null) => {
  const _id = generateId();
  console.log(error);
  return _id;
};

module.exports = analytics;
