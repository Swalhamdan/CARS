const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
  id: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
  courses: {type: [String]}
});

module.exports = mongoose.model('User', UserSchema);