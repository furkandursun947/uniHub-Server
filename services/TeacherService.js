import db from '../models/Index.js';
import { courseService } from '../routes/routes.js';
import jwt from 'jsonwebtoken';

class TeacherService {

    teacher = db.Teacher;

    createTeacher = (teacher) => {
        try {
            return this.teacher.create(teacher);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    getAllTeachers = () => {
        try {
            return this.teacher.findAll();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    getTeacherLogin = async (where) => {
        try {
            const email = where.email;
            const teacher = await this.teacher.findOne({ where });
            if (teacher === null) {
                return null;
            }
            else {
                if (teacher.dataValues.isAssigned === false) {
                    throw new Error("User is not Assgined Yet")
                }
                const token = await jwt.sign(
                    { user_id: teacher.id, email },
                    process.env.TOKEN_KEY,
                );
                teacher.token = token;
                return teacher;
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    getTeacherById = async (id) => {
        const teacher = await this.teacher.findByPk(id, {
            include: [
                { model: courseService.course, as: 'courses' }
            ]
        });
        if (teacher === null) {
            throw new Error("Teacher Not Found!");
        } else {
            return teacher;
        }
    }

    updateTeacherById = (id, teacher) => {
        try {
            this.teacher.update(teacher, {
                where: { id }
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    deleteTeacherById = (id) => {
        try {
            this.teacher.destroy({
                where: { id }
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    addCourseToTheTeacher = async (courseBody, teacherId) => {
        try {
            const teacher = await this.getTeacherById(teacherId);
            const course = await courseService.createCourse(courseBody);
            if (teacher == null) {
                throw new Error("Teacher Not Found!");
            } else {
                await teacher.addCourse(course);
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    getUnassignTeachers = () => {
        try {
            return this.teacher.findAll({
                where: {
                    isAssigned: false
                }
            })
        } catch (err) {
            throw new Error(err.message);
        }
    }

    assignTeachers = async (teacherIds, universityId) => {
        try {

            for await (const teacherId of teacherIds) {
                await this.teacher.update({ UniversityId: universityId, isAssigned: 1 }, {
                    where: {
                        id: teacherId
                    }
                })
            }

        } catch (err) {
            throw new Error(err.message);
        }
    }

    unAssignTeacher = async (teacherId) => {
        try {
            this.teacher.update({ isAssigned: 0, UniversityId: null }, {
                where: {
                    id: teacherId
                }
            })
        } catch (err) {
            throw new Error(err.message);
        }
    }

}

export default TeacherService;