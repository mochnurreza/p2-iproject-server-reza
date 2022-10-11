const mongoose = require("mongoose");
const {hash} = require('../helpers/bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', function(next){
   if(this.isModified('password')){
      this.password = hash(this.password)
   }
    return next(null, this);
} )

module.exports = mongoose.model("User", userSchema);
