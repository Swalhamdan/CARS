const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { check } = require('express-validator');

router.get('/', courseController.getCourses);

router.get('/add', courseController.openAddCourseForm);
router.post('/add', [
    check('course').isString(),
    check('description').isString(),
    check('averageGrade').isNumeric()
], courseController.addCourse);

router.get('/addGrades', courseController.openAddGradeForm);
router.post('/addGrades', [
    check('averageGrade').isNumeric()
], courseController.addGrade)

// router.get('/:brand', carsController.getCarByBrand);

module.exports = router;