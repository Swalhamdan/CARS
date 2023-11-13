const mongoose = require('mongoose');

let CourseSchema = mongoose.Schema({
  course: {type: String, required: true, unique: true},
  description: {type: String},
  averageGrade: {type: [Number], required: true}
});

module.exports = mongoose.model('Course', CourseSchema);