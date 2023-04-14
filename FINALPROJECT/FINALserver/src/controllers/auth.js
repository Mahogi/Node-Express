const bcrypt = require("bcrypt")
const uid = require("uid")
const userSchema = require('../schemas/userSchema')

module.exports = {
  register: async (req, res) => {
    const {email, passwordOne: password} = req.body;

    const userExists = await userSchema.findOne({email: email});
    if(userExists) return res.send({success: false, message: "This username already exists"});
    else {
      const hashedPass = await bcrypt.hash(password, 10)

      const userInDb = new userSchema({
        secret: uid.uid(),
        email,
        password: hashedPass,
      })

      await userInDb.save();

      res.send({success: true, message: ""});
    }

  },
  login: async (req, res) => {
    const {email, password} = req.body
    const userExists = await userSchema.findOne({email: email})

    // console.log(userExists)
    if(!userExists) return res.send({success: false, message: "This username does not exist"})

    const passMatch = await bcrypt.compare(password, userExists.password)
    // console.log(passMatch)
    if(!passMatch) return res.send({success: false, message: "Password is incorrect"})

    return res.send({
      success: true,
      message: "",
      secret: userExists.secret,
      email: userExists.email,
      image: userExists.image
    })
  },
  updatePhoto: async (req, res) => {
    const {url, secret} = req.body;

    try {
      await userSchema.findOneAndUpdate({secret}, {$set: {image: url}});
    } catch (e) {
      return res.send({error: true});
    }
    return res.send({error: false});
  },

  updateEmail: async (req, res) => {
    const {newMail, secret} = req.body;
    const userExists = await userSchema.findOne({email: newMail});
    console.log("Does " + newMail + " already exist? --- " + userExists);
    if (userExists) return res.send({success: false, message: "This username already exists"});
    else try {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(newMail)) return res.send({success: false, message: "Incorrect email formal"});
          console.log("Username didn't exist, changing..." + secret);
          await userSchema.findOneAndUpdate({secret}, {$set: {email: newMail}});
      } catch (e) {
        return res.send({success: false, message: e.message});
      }
    return res.send({success: true});
  },

  updatePassword: async (req, res) => {
    const {newPass, secret} = req.body;

    if (newPass.length < 5 || newPass.length > 20) return res.send({
      success: false,
      message: "pass min 5, max 20 length"
    });
    let hasUpperCase = false;
    let hasNumber = false;
    for (let i = 0; i < newPass.length; i++) {
      if (!Number(newPass[i])) {
        if (newPass[i].toUpperCase() === newPass[i]) {
          hasUpperCase = true;
        }
      }
      if (Number(newPass[i]) || Number(newPass[i]) === 0) {
        hasNumber = true;
      }
    }
    if (!hasUpperCase) return res.send({
      success: false,
      message: "Password should have upper case letter"
    });
    if (!hasNumber) return res.send({
      success: false,
      message: "Password should have number in it"
    });

    const newPassHashed = await bcrypt.hash(newPass, 10);

    try {
      await userSchema.findOneAndUpdate({secret}, {$set: {password: newPassHashed}});
    } catch (e) {
      return res.send({success: false, message: e.message});
    }
    return res.send({success: true});
  }
}