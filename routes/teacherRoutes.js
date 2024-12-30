const express = require('express');
const { getTeachers, createTeacher } = require('../controllers/teacherController');
const router = express.Router();

router.get('/', getTeachers);
router.post('/', createTeacher);

module.exports = router;
