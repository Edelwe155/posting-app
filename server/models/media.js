const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  video: String,
  pics: [String],
  gifs: [String],
  text: {
    name: String,
    description: String,
    tags: [String],
    links: [String],
  },
});

const PostModel = mongoose.model("posts", PostSchema);
module.exports = PostModel;
