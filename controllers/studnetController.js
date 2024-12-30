const Student = require('../models/studentModel');

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .populate('enrolledCourses', 'title description');
        res.status(200).json({
            success: true,
            data: students,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch students',
            error: error.message,
        });
    }
};

exports.createStudent = async (req, res) => {
    try {
        const { name, email } = req.body;
        const student = new Student({ name, email });
        await student.save();

        res.status(201).json({
            success: true,
            data: student,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create student',
            error: error.message,
        });
    }
};
