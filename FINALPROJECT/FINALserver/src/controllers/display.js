const userSchema = require('../schemas/userSchema');

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await userSchema.find();
    console.log("I got all users");
    res.send({success: true, users});
  },
  getUserById: async (req, res) => {
    const {id} = req.params;
    const user = await userSchema.findOne({_id: id});
    console.log("I got one user");
    res.send({success: true, user});
  },
  getUserByEmail: async (req, res) => {
    const {email} = req.params;
    const user = await userSchema.findOne({email: email});
    console.log("I got one user by email:" + email);
    res.send({success: true, user});
  }
}