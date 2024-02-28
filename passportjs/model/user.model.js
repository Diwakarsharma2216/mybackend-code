const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
