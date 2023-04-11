const axios = require('axios');

module.exports = async () => {
  const url = 'https://this-person-does-not-exist.com';
  const res = await axios.get('https://this-person-does-not-exist.com/en?new=1678231231069');
  return url + res.data.src;
}