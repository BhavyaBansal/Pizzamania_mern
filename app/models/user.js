//model is singular and in database it is plural
//Like here it is menu and in db it is menus
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  role: { type: String, default:'customer'},
},{timestamps:true});
module.exports = mongoose.model("User", userSchema);
