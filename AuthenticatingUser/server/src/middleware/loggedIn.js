const {getAll} = require("../modules/userDatabase")
const userSchema = require('../schemas/userSchema');

module.exports = async (req, res, next) => {
  //const allUsers = getAll()
  const allUsers = await userSchema.find({});
  const {secret} = req.body

  const myUser = allUsers.find(x => x.secret === secret)

  if(!myUser) return res.send({error: true, message: "bad auth"})
  //else return res.send({error: false, message: "good auth"});

  next()
}