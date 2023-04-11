
const messageDb = require('../schemas/messagesSchema')
const userDb = require("../schemas/userSchema")

module.exports = {
  createMessage: async (req, res) => {
    const {message, email} = req.body

    const msg = new messageDb({
      username: email,
      message,
      likes: 0,
      replies: []
    })
    console.log('REEEEE-----' + message, email);
    await msg.save()

    const allMessages = await messageDb.find()

    res.send({messages: allMessages})
  },
  likeMessage: async (req, res) => {
    const {email, id} = req.body

    const message = await messageDb.findOne({_id: id})
    const user = await userDb.findOne({email})

    if(message.username === user.email) {
      return res.send({error: true, message: "you can't like yourself"})
    }

    await messageDb.findOneAndUpdate({_id: id}, {$inc: {likes: 1}})


    const allMessages = await messageDb.find()
    res.send({error: false, messages: allMessages})
  },
  reply: async (req, res) => {
    const {id, email, reply} = req.body
    const replyObject = {
      message: reply,
      email
    }

    await messageDb.findOneAndUpdate({_id: id}, {$push: {replies: replyObject }})

    const allMessages = await messageDb.find()
    res.send({error: false, messages: allMessages})
  }
}