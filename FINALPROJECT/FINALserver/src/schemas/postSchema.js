const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  replies: {
    type: Array,
    required: true
  },
});

module.exports = mongoose.model('final-posts', postSchema);