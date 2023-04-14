const userSchema = require('../schemas/userSchema')

module.exports = async (req, res, next) => {
  const {secret} = req.body;
  console.log('my secret --- ' + secret);

  const myUser = await userSchema.findOne({secret});

  if(!myUser) return res.send({error: true, message: "You need to be logged in"});
  req.body.email = myUser.email;

  next();
}