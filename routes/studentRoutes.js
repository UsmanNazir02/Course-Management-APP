const express = require('express');
const { getStudents, createStudent } = require('../controllers/studnetController');
const router = express.Router();

router.get('/', getStudents);
router.post('/', createStudent);

module.exports = router;
