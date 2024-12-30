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

//update student
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            });
        }
        res.status(200).json({
            success: true,
            data: student,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update student',
            error: error.message,
        });
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Student is deleted',
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to delete student',
            error: error.message
        });

    }
}