const gifDb = require("../schemas/gifSchema")

module.exports = {
  create: async (req, res) => {
    const {url} = req.body
    const newGif = new gifDb({url})
    await newGif.save()

    const allGifs = await gifDb.find()

    res.send({error: false, gifs: allGifs})
  },
  getAll: async (req, res) => {
    const allGifs = await gifDb.find()
    res.send({error: false, gifs: allGifs})

  },
  getSingle: async (req, res) => {
    const {id} = req.params
    const gif = await gifDb.findOne({_id: id})
    res.send({error: false, gif})

  },
  update: async (req, res) => {
    const {id, url} = req.body

    await gifDb.findOneAndUpdate({_id: id}, {$set: {url}})
    res.send({error: false})

  },
  remove: async (req, res) => {
    const {id} = req.params
    await gifDb.findByIdAndDelete(id)
    res.send({error: false})
  }
}