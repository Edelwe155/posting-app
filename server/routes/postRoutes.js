const express = require("express");
const cors = require("cors");
const { postMedia } = require("../controllers/postController");

const router = express.Router();

router.use(cors({ credentials: true, origin: "http://localhost:5173" }));

router.post("/post-media", postMedia);

module.exports = router;
