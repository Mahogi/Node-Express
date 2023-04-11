//const bcrypt = require("bcrypt")
const bcrypt = require("../services/bcrypt-service");
const uid = require("uid");

const userDb = require("../modules/userDatabase");
const userSchema = require('../schemas/userSchema');

module.exports = {
  register: async (req, res) => {
    const {email, password: password} = req.body

    console.log("Trying to create user");
    const hashedPass = await bcrypt.BcryptService.hash(password)//await bcrypt.hash(password, 10)
    const userInDb = new userSchema({
      secret: uid.uid(),
      email,
      password: hashedPass
    });
    //console.log(newUser);
    await userInDb.save();
    //users.push(newUser);
    //console.log("Showing all users");
    //console.log(users);
    res.send({success: true, message: ""});
  },
  login: async (req, res) => {
    const {email, password} = req.body;

    //const userExists = users.find(x => x.email === email)
    //if(!userExists) return res.send({success: false, message: "Bad credentials"})
    const userExists = await userSchema.findOne({email: email});
    console.log(userExists);
    if(!userExists) return res.send({success: false, message: "Bad credentials"});

    const passMatch = await bcrypt.BcryptService.compare(password, userExists.password);

    if(!passMatch) return res.send({success: false, message: "Bad credentials"});


    return res.send({
      success: true,
      message: "",
      secret: userExists.secret,
      email: userExists.email,
      image: userExists.image
    });
  },

  updatePhoto: async (req, res) => {
    const {url, secret} = req.body

    try {
      await userSchema.findOneAndUpdate({secret}, {$set: {image: url}});
    } catch (e) {
      return res.send({error: true});
    }
    return res.send({error: false});
  }
}