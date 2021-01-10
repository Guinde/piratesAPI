const mongoose = require("mongoose");
const { Schema } = mongoose;

const pirateSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  crew: {
    type: String,
  }
});

module.exports = mongoose.model("pirates", pirateSchema);