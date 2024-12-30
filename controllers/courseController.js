const Course = require('../models/courseModel');
const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate('teacher', 'name email')
            .populate('students', 'name email');
        res.status(200).json({
            success: true,
            data: courses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch courses',
            error: error.message,
        });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const { title, description, teacherId } = req.body;

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found',
            });
        }

        const course = new Course({ title, description, teacher: teacherId });
        await course.save();

        teacher.courses.push(course._id);
        await teacher.save();

        res.status(201).json({
            success: true,
            data: course,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create course',
            error: error.message,
        });
    }
};

exports.enrollStudent = async (req, res) => {
    try {
        const { courseId, studentId } = req.body;

        const course = await Course.findById(courseId);
        const student = await Student.findById(studentId);

        if (!course || !student) {
            return res.status(404).json({
                success: false,
                message: 'Course or Student not found',
            });
        }

        if (!course.students.includes(studentId)) {
            course.students.push(studentId);
            await course.save();
        }

        if (!student.enrolledCourses.includes(courseId)) {
            student.enrolledCourses.push(courseId);
            await student.save();
        }

        res.status(200).json({
            success: true,
            message: 'Student enrolled in course successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to enroll student',
            error: error.message,
        });
    }
};
