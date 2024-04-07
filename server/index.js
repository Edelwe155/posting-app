const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//app
const app = express();
//connection to DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => {
    console.log("CAN`T CONNECT TO DB"), err;
  });

//middlewar
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/postRoutes"));

app.listen(8000, () => {
  console.log("SERVER at port 8000 is running");
});
