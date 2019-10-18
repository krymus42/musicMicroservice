const mongoose = require('mongoose');


const mediaSchema = mongoose.Schema({
  name:String,
  path: String
});



module.exports = mongoose.model("media",mediaSchema);
