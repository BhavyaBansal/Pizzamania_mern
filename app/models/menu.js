//model is singular and in database it is plural
//Like here it is menu and in db it is menus 
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const menuSchema = new Schema({
    name:{type: String,required:true},
    image:{type: String,required:true},
    price:{type: Number,required:true},
    size:{type: String,required:true}
})
module.exports = mongoose.model("Menu", menuSchema);
