const express = require('express');
const { getCourses, createCourse, enrollStudent } = require('../controllers/courseController');
const router = express.Router();

router.get('/', getCourses);
router.post('/', createCourse);
router.post('/enroll', enrollStudent);

module.exports = router;
