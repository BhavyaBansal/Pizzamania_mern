require('dotenv').config()
const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
// if port is not available we will write this
const PORT = process.env.PORT || 3000;
//Assets
const mongoose = require("mongoose");
const session = require("express-session");
//Database Connection
mongoose.set("strictQuery", false);
const url = "mongodb://127.0.0.1/pizzamania";
mongoose.connect(url, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: true,
});
const conn = mongoose.connection;
conn.once("open", () => {
    console.log("Database Connected");
}).on("error", function (err) {
    console.log("Database Not Connected");
});
//Session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000*60*60*24} // 24 Hours
}))
//Assets
app.use(express.static("public"));
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
require("./routes/web")(app);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//GIT vs GITHUB
// git is a program ans github is a service/company that internally use git

// Laravel mix
