const faker = require('faker');
const getPhoto = require('./getPhoto');


module.exports = async (amountOfUsers) => {
  return {
    name: faker.name.firstName(),
    age: Math.round(Math.random() * 100),
    gender: Math.round(Math.random()) ? 'male' : 'female',
    email: faker.internet.email(),
    photo: await getPhoto()
  }
}