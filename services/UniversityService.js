import db from '../models/Index.js';
import { courseService, studentService, teacherService } from '../routes/routes.js';

class UniversityService {

    university = db.University;

    createUniversity = (university) => {
        return this.university.create(university);
    }

    getAllUniversities = () => {
        return this.university.findAll();
    }

    getUniversityById = async (id) => {
        const university = await this.university.findByPk(id, {
            include: [
                {
                    model: teacherService.teacher, as: 'teachers', include: [
                        { model: courseService.course, as: 'courses', include: [
                            { model: studentService.student }
                        ] }
                    ]
                }
            ]
        })
        if (university === null) {
            throw new Error("University Not Found");
        } else {
            return university;
        }
    }

    addTeacherToUniversity = async (teacherId, universityId) => {
        const university = await this.university.findByPk(universityId);
        const teacher = await teacherService.teacher.findByPk(teacherId);
        if (teacher === null) {
            throw new Error("Teacher Not Found!");
        } else if (university === null) {
            throw new Error("Course Not Found!");
        }

        try {
            await university.addTeacher(teacher);
        } catch (err) {
            throw new Error(err.message);
        }

    }
}

export default UniversityService;