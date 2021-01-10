const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const captainSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  crew: {
    type: String,
    required: true,
  },
  pirates: {
    type: [Schema.Types.ObjectId],
    ref: "pirates",
  },
});

/**
 * @param { Object } error
 * @param { Object } res
 * @param { Function } next
 * @desc Handle custom errors message
 * @return { String }
 */
const handleErrorSchema = (error, res, next) => {
  if (error.name === "MongoError" && error.code === 11000)
    next(new Error("This captain pirate already exist"));
  else if (error.name === "ValidationError") {
    const err = error.message.split(":");
    const e = err[2];
    next(new Error(e));
  } else next(error);
};

captainSchema.post("save", handleErrorSchema);

/**
 * @param { String } pwd
 * @desc hash password before insert to the DB
 * @return { String } password hashed
 */
captainSchema.statics.hashPassword = pwd => {
  return bcrypt.hash(pwd, 12);
};

/**
 * @param { String } pwd
 * @desc compare password with DB
 * @return { String } bool
 */
captainSchema.methods.comparePassword = function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

module.exports = mongoose.model("Captain", captainSchema);