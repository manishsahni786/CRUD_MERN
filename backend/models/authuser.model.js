const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const AuthUser = mongoose.model('AuthUser', authSchema);

module.exports = AuthUser;
