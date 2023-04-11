const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gifSchema = new Schema({
    url: {
      type: String,
      required: true
    }
  }
)

module.exports = mongoose.model('ca-gif', gifSchema)