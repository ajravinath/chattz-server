const mapKeys = require('lodash/mapKeys');
const camelCase = require('lodash/camelCase');

module.exports = {
  snakeToCamel(object) {
    return mapKeys(object, (value, key) => camelCase(key));
  }
};
