const userDb = require("../modules/userDatabase")
const uid = require("uid")
const postSchema = require('../schemas/postSchema')
const userSchema = require('../schemas/userSchema')

//const posts = []


module.exports = {
  create: async (req, res) => {
    const post = req.body;
    //const allUsers = userDb.getAll()
    //const myUser = allUsers.find(x => x.secret === post.secret)
    const allUsers = await userSchema.find({});
    const myUser = allUsers.find(x => x.secret === post.secret);

    post.email = myUser.email;
    post.id = uid.uid();
    delete post.secret;


    const postInDb = new postSchema({
      email: post.email,
      image: post.image,
      title: post.title,
      description: post.description,
    })
    //posts.push(post);
    //console.log(myUser);
    console.log(postInDb);
    await postInDb.save();
    const posts = await postSchema.find({});

    res.send({error: false, message: "post created", posts});
  },
  getAll: async (req, res) => {
    const posts = await postSchema.find({});
    res.send({error: false, message: "", posts});
  }
}