import CourseService from '../services/CourseService.js';

const service = new CourseService();

export default class CourseController {

    createCourse = async (req, res) => {
        try {
            const { teacherId, course } = req.body
            await service.createCourse(teacherId, course);
            res.status(201).send("Course has created successfully!");
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    getAllCourses = async (req, res) => {
        try {
            const courses = await service.getAllCourses();
            res.status(200).send(courses);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    getCourseById = async (req, res) => {
        try {
            const course = await service.getCourseById(req.params.id);
            res.status(200).send(course);
        } catch (err) {
            res.status(404).send(err.message);
        }
    }

    getHomeworkById = async (req, res) => {
        try {
            const homework = await service.getHomeworkById(req.params.id);
            res.status(200).send(homework);
        } catch (err) {
            res.status(404).send(err.message);
        }
    }

    updateHomeworkGrades = async (req, res) => {
        try {
            await service.updateHomeworkGrades(req.params.homeworkId, req.body);
            res.status(200).send("Grades are updated!");
        } catch (err) {
            res.status(404).send(err.message);
        }
    }

    updateCourse = async (req, res) => {
        try {
            await service.updateCourse(req.params.id, req.body);
            res.status(200).send("Course has updated successfully!");
        } catch (err) {
            res.status(404).send(err.message);
        }
    }

    addStudentToCourse = async (req, res) => {
        try {
            await service.addStudentToCourse(req.params.id, req.params.studentId);
            res.status(201).send("Student has successfully enrolled to the course!");
        } catch (err) {
            res.status(404).send(err.message);
        }
    }

    addHomeworkToTheCourse = async (req, res) => {
        try {
            const { homeworkName, deadLine, weight } = req.body
            const filePath = req.files[0].filename;
            await service.addHomeworkToTheCourse(req.params.courseId, deadLine, homeworkName, weight, filePath);
            res.status(201).send("Homework Successfully Created!");
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    addHomeworkFile = async (req, res) => {
        try {
            const { studentId, homeworkId } = req.body
            const filePath = req.files[0].filename;
            await service.addHomeworkFile(studentId, homeworkId, filePath);
            res.status(201).send("Homework added.")
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    addStudentHomeworkFile = async (req, res) => {
        try {
            const { studentId, homeworkId } = req.body
            const filePath = req.files[0].filename;
            await service.addStudentHomeworkFile(studentId, homeworkId, filePath);
            res.status(201).send("Homework added.")
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    updateStudentHomeworkFile = async (req, res) => {
        try {
            const { studentId, homeworkId } = req.body
            const filePath = req.files[0].filename;
            await service.updateStudentHomeworkFile(studentId, homeworkId, filePath);
            res.status(201).send("Homework updated.")
        } catch (err) {
            res.status(400).send(err.message)
        }
    }


    updateHomework = async (req, res) => {
        try {
            const { deadLine, homeworkName, weight } = req.body
            const filePath = req.files[0]?.filename;
            await service.updateHomework(req.params.id, deadLine, homeworkName, weight, filePath)
            res.status(201).send("Homework Updated.")
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    deleteTeacherHomework = async (req, res) => {
        try {
            await service.deleteTeacherHomework(req.params.id)
            res.status(201).send("Homework deleted Successfully.")
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    addExamToCourse = async (req, res) => {
        try {
            await service.addExamToTheCourse(req.params.courseId, JSON.parse(req.body.exam), JSON.parse(req.body.questions), req.files);
            res.status(201).send("Exam Has Successfully Created!");
        } catch (err) {
            res.status(400).send(err.message)
        }
    }


    getExamById = async (req, res) => {
        try {
            const result = await service.getExamById(req.params.examId, req.body.date);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    saveExamResultById = async (req, res) => {
        try {
            await service.saveExamResult(req.body.studentId, req.body.examId, req.body.point);
            res.status(201).send("Exam Result successfully Saved!");
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    getStudentHomework = async (req, res) => {
        try {
            const homework = await service.getStudentHomework(req.body.studentId, req.body.homeworkId);
            res.status(200).send(homework);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    updateExam = async (req, res) => {
        try {
            await service.updateExam(req.params.id, req.body.exam, req.body.questions)
            res.status(201).send("Succesfully Updated");
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    finishCourse = async (req, res) => {
        try {
            await service.finishCourse(req.params.id)
            res.status(201).send("Course is Successfully Finished!");
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

}
