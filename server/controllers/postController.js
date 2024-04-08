const Media = require("../models/media");
const fs = require("fs");
const path = require("path");

const postMedia = async (req, res) => {
  try {
    const { video, pics, gifs, text } = req.body;

    if (!video && !pics && !gifs && !text) {
      return res.json({ error: "Can't post empty form" });
    }

    const postedMedia = await Media.create({
      video,
      pics,
      gifs,
      text,
    });

    return res.json("Posted successfully");
  } catch (error) {
    console.error(error);
    res.json({ error: "An error occurred while posting media" });
  }
};

module.exports = { postMedia };
