const userSchema = require('../schemas/userSchema');

module.exports = {
  createNewRecord: async () => {
    const newUser = new userSchema({
      email: "myemail@gmail.com",
      secret: "somesecret1234",
      password: "somepassword" //hashed
    });
    await newUser.save();
},

  getAllRecords: async () => {
    const allUsers = await userSchema.find();
  },

  findParticularRecord: async () => {
    const user = await userSchema.findOne({email: "emailkurioieskau@gmail.com"});
  },

  updateRecord: async () => {
    await userSchema.findOneAndUpdate({email: "someemail@gmail.com"}, {$set: { secret: "nauja secret reiksme"}});
  },

  deleteRecord: async () => {

  }
}