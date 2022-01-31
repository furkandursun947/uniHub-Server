import db from '../models/Index.js';
import { studentService, teacherService } from '../routes/routes.js';
import moment from 'moment';
import _ from 'lodash';
import fs from 'fs';


class CourseService {

    course = db.Course;

    createCourse = async (teacherId, course) => {
        const teacher = await teacherService.getTeacherById(teacherId);
        course.crn = Math.floor(Math.random() * 10000).toString();
        const newCourse = await this.course.create(course);
        await teacher.addCourse(newCourse);
    }

    getAllCourses = () => {
        return this.course.findAll();
    }

    getCourseById = async (id) => {
        const course = await this.course.findByPk(id, {
            include: [
                { model: db.Exam, as: 'exams' },
                { model: db.Homework, as: 'homeworks' },
                { model: db.Student, as: 'Students' }
            ]
        });
        if (course === null) {
            throw new Error("Course Not Found");
        } else {
            return course;
        }
    }

    getHomeworkById = async (id) => {
        const homework = await db.Homework.findByPk(id, {
            include: [
                {
                    model: db.Course, as: 'Course', include: [
                        { model: db.Teacher, as: 'Teacher' },
                        {
                            model: db.Student, as: 'Students', include: [
                                { model: db.Homework }
                            ]
                        }
                    ]
                },
            ]
        });
        if (homework === null) {
            throw new Error("Homework Not Found");
        } else {
            return homework;
        }
    }

    updateHomeworkGrades = async (homeworkId, body) => {
        for await (const el of body) {
            await db.StudentHasHomework.update({ note: el.grade }, {
                where: { StudentId: el.id, HomeworkId: homeworkId }
            })
        }
    }

    updateCourse = async (id, course) => {
        this.course.update(course, {
            where: { id }
        })
    }

    addStudentToCourse = async (courseId, studentId) => {

        const student = await studentService.getStudentById(studentId);
        const course = await this.getCourseById(courseId);

        try {
            if (student === null) {
                throw new Error("Student Not Found!");
            } else if (course === null) {
                throw new Error("Course Not Found!");
            }

            if (course.studentCount === course.capacity) {
                throw new Error("Course is full of its student capacity!");
            } else {
                await student.addCourse(course);
                await course.addStudent(student);
                await course.increment('studentCount')
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    addHomeworkToTheCourse = async (courseId, deadLine, homeworkName, weight, filePath) => {

        try {

            const course = await this.getCourseById(courseId);

            if (course === null) {
                throw new Error("Course Not Found");
            }

            const homework = await db.Homework.create({ deadLine, homeworkName, filePath, weight });
            course.addHomework(homework);

        } catch (err) {
            throw new Error(err.message);
        }

    }

    addStudentHomeworkFile = async (studentId, homeworkId, filePath) => {
        db.StudentHasHomework.create({ StudentId: studentId, HomeworkId: homeworkId, filePath })
    }

    updateStudentHomeworkFile = async (studentId, homeworkId, filePath) => {
        const hw = await db.StudentHasHomework.findOne({ where: { StudentId: studentId, HomeworkId: homeworkId } });
        fs.unlink(`./uploads/Homeworks/FromStudent/${hw.filePath}`, (e) => {
            console.log(e);
        });
        db.StudentHasHomework.update({ filePath }, { where: { StudentId: studentId, HomeworkId: homeworkId } })
    }

    updateHomework = async (id, deadLine, homeworkName, weight, filePath) => {

        try {
            const homework = {};
            if (filePath) {
                homework.filePath = filePath;
                const hw = await db.Homework.findByPk(id);
                fs.unlink(`./uploads/Homeworks/FromTeacher/${hw.filePath}`, (e) => {
                    console.log(e);
                });
            }
            if (deadLine) {
                homework.deadLine = deadLine;
            }
            if (homeworkName) {
                homework.homeworkName = homeworkName;
            }
            if (weight) {
                homework.weight = weight;
            }
            db.Homework.update(homework, {
                where: { id }
            })

        } catch (err) {
            throw new Error(err.message);
        }

    }

    addExamToTheCourse = async (courseId, exam, questions, files) => {
        const examDb = await db.Exam.create({ examName: exam.examName, startDate: exam.date[0], deadLine: exam.date[1], weight: exam.weight });
        let counter = 0;
        questions.map(async (el) => {
            if (el.image === null) {
                el.imagePath = ""
            } else {
                el.imagePath = files[counter].filename;
                counter += 1;
            }
            const question = await db.Question.create(el);
            examDb.addQuestion(question);
        })
        const course = await this.getCourseById(courseId);
        course.addExam(examDb)
    }

    deleteTeacherHomework = async (id) => {
        const hw = await db.Homework.findByPk(id);
        fs.unlink(`./uploads/Homeworks/FromTeacher/${hw.filePath}`, (e) => {
            console.log(e);
        });
        db.Homework.update({ filePath: '' }, {
            where: { id }
        })

    }

    getExamById = async (examId, date) => {
        const exam = await db.Exam.findByPk(examId, {
            include: [
                { model: db.Question, as: 'questions' },
                { model: db.Student, as: 'Students' },
                {
                    model: db.Course, as: 'Course', include: [
                        { model: db.Student, as: 'Students' }
                    ]
                }
            ]
        })

        const currentDate = moment(date, 'DD/MM/YYYY HH:mm:ss');
        const startDate = moment(exam.startDate, 'DD/MM/YYYY HH:mm:ss');
        const deadLine = moment(exam.deadLine, 'DD/MM/YYYY HH:mm:ss');

        if (currentDate.isBetween(startDate, deadLine)) {
            return exam;
        } else {
            const notAvaibleExam = {}
            notAvaibleExam.exam = exam;
            notAvaibleExam.id = exam.id;
            notAvaibleExam.examName = exam.examName;
            notAvaibleExam.startDate = exam.startDate;
            notAvaibleExam.deadLine = exam.deadLine;
            notAvaibleExam.courseId = exam.courseId;

            return notAvaibleExam;
        }

    }

    saveExamResult = async (studentId, examId, point) => {
        const student = await studentService.getStudentById(studentId);
        const exam = await db.Exam.findByPk(examId);
        try {
            if (student === null) {
                throw new Error("Student Not Found!");
            } else if (exam === null) {
                throw new Error("Exam Not Found!");
            }

            await student.addExam(exam, { through: { note: point } });
            await exam.addStudent(student, { through: { note: point } });

        } catch (err) {
            throw new Error(err.message);
        }
    }

    getStudentHomework = async (studentId, homeworkId) => {
        return await db.StudentHasHomework.findOne({ where: { StudentId: studentId, HomeworkId: homeworkId } });
    }

    updateExam = async (examId, exam, question) => {

        await db.Exam.update(exam, {
            where: { id: examId }
        })

        for await (const [key, value] of Object.entries(question)) {
            let question = {}
            if (value["1"]) {
                question.choice1 = value["1"]
            }
            if (value["2"]) {
                question.choice2 = value["2"]
            }
            if (value["3"]) {
                question.choice3 = value["3"]
            }
            if (value["4"]) {
                question.choice4 = value["4"]
            }
            const obj = { ...question, ...value }

            await db.Question.update(obj, {
                where: { id: key }
            })
        }
    }

    finishCourse = async (courseId) => {
        const course = await this.getCourseById(courseId);

        for await (const student of course.Students) {
            let grade = 0;
            for await (const hw of course.homeworks) {
                const studentHomework = await this.getStudentHomework(student.id, hw.id);
                if (studentHomework !== null) {
                    grade += studentHomework.note ? (hw.weight * studentHomework.note / 100) : 0;
                }
            }
            for await (const exam of course.exams) {
                const studentExam = await db.StudentHasExam.findOne({ where: { StudentId: student.id, examId: exam.id } });
                if (studentExam !== null) {
                    grade += studentExam.note ? (exam.weight * studentExam.note / 100) : 0;
                }
            }
            const std = await db.Student.findByPk(student.id, { include: [{ model: db.Course }] })
            let length = 0;
            std.Courses.forEach((crs) => {
                if (crs?.isFinished)
                    length += 1;
            })
            const newGpa = ((length * std.gpa) + grade) / (length + 1);
            await db.StudentHasCourse.update({ isFinished: true, grade }, { where: { StudentId: student.id, courseId: course.id } })
            await db.Student.update({ gpa: newGpa }, { where: { id: student.id } })
        }
        await db.Course.update({ isFinished: true }, { where: { id: courseId } })
    }
}

export default CourseService;