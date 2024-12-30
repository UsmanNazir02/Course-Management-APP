const Teacher = require("../models/teacherModel");

exports.getTeachers = async (req, res) => {
    console.log(Teacher); // Should output the Mongoose model
    try {
        console.log('getTeachers');
        const teachers = await Teacher.find(); // Use the correct reference
        res.status(200).json({
            success: true,
            data: teachers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch teachers',
            error: error.message,
        });
    }
};

exports.createTeacher = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newTeacher = new Teacher({ name, email });
        await newTeacher.save();
        res.status(201).json({
            success: true,
            data: newTeacher,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create teacher',
            error: error.message,
        });
    }
};
