const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    numRegisteredStudents: { type: Number },
    numPassedStudents: { type: Number },
    activities: { type: Array },
    gradeDistribution: { type: Array },
    testimonials: { type: Array },
});

module.exports = mongoose.model('Course', courseSchema);