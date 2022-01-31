import express from "express";
import TeacherRoutes from './Teacher.routes.js';
import StudentRoutes from './Student.routes.js';
import CourseRoutes from './Course.routes.js';
import UniversityRoutes from './University.routes.js';

import TeacherService from '../services/TeacherService.js';
import StudentService from '../services/StudentService.js';
import CourseService from '../services/CourseService.js';
import UniversityService from '../services/UniversityService.js';
import path from "path";

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello There!")
})

router.get('/uploads/:folder/:folder2/:fileName', (req, res) => {
    try {
        res.sendFile(path.join(path.resolve(), `uploads/${req.params.folder}/${req.params.folder2}/` + req.params.fileName));
    } catch (err) {
        res.status(404).send(err.message);
    }
})

router.get('/uploads/:folder/:fileName', (req, res) => {
    try {
        res.sendFile(path.join(path.resolve(), `uploads/${req.params.folder}/` + req.params.fileName));
    } catch (err) {
        res.status(404).send(err.message);
    }
})

router.use(TeacherRoutes);
router.use(StudentRoutes);
router.use(CourseRoutes);
router.use(UniversityRoutes);

const teacherService = new TeacherService();
const studentService = new StudentService();
const courseService = new CourseService();
const universityService = new UniversityService();
export { teacherService, studentService, courseService, universityService };

export default router;