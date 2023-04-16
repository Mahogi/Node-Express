const postSchema = require("../schemas/postSchema");

module.exports = {
  createPost: async (req, res) => {
    const {email, image, title, description} = req.body;

    const post = new postSchema({
      email,
      image,
      title,
      description,
      replies: []
    });
    await post.save();

    //const posts = await postSchema.find();
    const id = post.id;

    res.send({success: true, id});
  },

  getPostById: async (req, res) => {
    const {id} = req.params;
    const post = await postSchema.findOne({_id: id});

    res.send({success: true, post})
  },

  getPostsByEmail: async (req, res) => {
    const {email} = req.params

    const post = await postSchema.find({email})

    res.send({success: true, post})
  },

  getAllPosts: async (req, res) => {
    const posts = await postSchema.find();
    console.log("I got all posts");
    //console.log(posts);
    res.send({success: true, posts});
  },

  deletePostById: async (req, res) => {
    const {id} = req.params;
    try {
      await postSchema.deleteOne({_id: id});
      res.send({success: true, message: "Post deleted successfully."});
    } catch (error) {
      console.log(error);
      res.status(500).send({success: false, message: "An error occurred while deleting the post."});
    }
  },
  reply: async (req, res) => {
    const {id, email, reply} = req.body
    const replyObject = {
      message: reply,
      email
    }
    console.log("-----reply-----");
    console.log("id="+id);
    console.log(replyObject);
    try {
      await postSchema.findOneAndUpdate({_id: id}, {$push: {replies: replyObject }});
      const post = await postSchema.findOne({_id: id});
      console.log("-----reply in database -----");
      res.send({success: true, post: post});
    } catch (error) {
      res.send({success: false, message: "An error occurred while replying."});
      console.log("-----reply error -----");
    }
  }
}