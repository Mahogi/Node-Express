const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messagesSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      required: true
    },
    replies: {
      type: Array,
      required: true
    },
  }
)


module.exports = mongoose.model('messages', messagesSchema)