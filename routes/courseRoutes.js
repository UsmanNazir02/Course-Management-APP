const express = require('express');
const { getCourses, createCourse, enrollStudent, updateCourse, deleteCourse } = require('../controllers/courseController');
const router = express.Router();

router.get('/', getCourses);
router.post('/', createCourse);
router.post('/enroll', enrollStudent);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
