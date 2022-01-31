import TeacherService from '../services/TeacherService.js';
import passwordToHash from '../scripts/utils/helper.js';
import jwt from 'jsonwebtoken';
const service = new TeacherService();

export default class TeacherController {

    getTeachers = async (req, res) => {
        try {
            const teachers = await service.getAllTeachers();
            res.status(200).send(teachers);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    getTeacherLogin = async (req, res) => {
        req.body.password = passwordToHash(req.body.password);
        service.getTeacherLogin(req.body).then(async (loggedUser) => {
            if (loggedUser == null) return res.status(200).json({ error: "no user" });
            else {
                const token = await jwt.sign(
                    { id: loggedUser.id, email: loggedUser.email, isStudent: false },
                    process.env.TOKEN_KEY
                );
                const { email, id } = loggedUser.dataValues
                return res.status(201).json({ email, id, token, isStudent: false });
            }
        }).catch(err => res.status(200).send({ error: err.message }))
    }

    getTeacherById = async (req, res) => {
        try {
            const teacher = await service.getTeacherById(req.params.id)
            res.status(200).send(teacher);
        } catch (err) {
            res.status(404).send(err.message);
        }
    }

    createTeacher = async (req, res) => {
        try {
            req.body.password = passwordToHash(req.body.password);
            req.body.teacherNumber = Math.floor(Math.random() * 1000000000).toString();
            service.createTeacher(req.body).then(async (createdUser) => {
                if (!createdUser.dataValues) return res.status(500).send({ error: "Sorun var." });
                else {
                    const token = await jwt.sign(
                        { id: createdUser.id, email: createdUser.email },
                        process.env.TOKEN_KEY
                    );
                    return res.status(201).json({ ...createdUser.dataValues, token });
                }
            });
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    updateTeacher = async (req, res) => {
        try {
            req.body.password = passwordToHash(req.body.password);
            const user = await service.getTeacherById(req.params.id);
            if(user.password != req.body.password){
                return res.status(404).json({error: "Password is wrong"});
            }
            else{
                await service.updateTeacherById(req.params.id, req.body);
            }
            res.status(201).json({ "message": "Teacher Updated" });
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    deleteTeacher = async (req, res) => {
        try {
            await service.deleteTeacherById(req.params.id);
            res.status(200).json({ "message": "Teacher Deleted" });
        } catch (err) {
            res.status(404).send(err.message);
        }
    }

    addCourseToTeacher = async (req, res) => {
        try {
            await service.addCourseToTheTeacher(req.body, req.params.id);
            res.status(201).json({ "message": "Course added to Teacher" });
        } catch (err) {
            res.status(404).send(err.message);
        }
    }

    getUnassignTeachers = async (req, res) => {
        try {
            const teachers = await service.getUnassignTeachers();
            res.status(200).send(teachers);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    assignTeachers = async (req, res) => {
        try {
            const { teacherIds, universityId } = req.body;
            await service.assignTeachers(teacherIds, universityId);
            res.status(201).json({ "message": "Teachers are assigned" });
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    unAssignTeacher = async (req, res) => {
        try {
            const { teacherId } = req.body;
            await service.unAssignTeacher(teacherId);
            res.status(201).json({ "message": "Teacher unassigned" });
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    loginWithToken = async (req, res) => {
        res.status(200).send({ ...req.user, token: req.headers["authorization"] })
    }

}