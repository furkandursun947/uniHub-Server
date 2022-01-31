import StudentService from '../services/StudentService.js';
import passwordToHash from '../scripts/utils/helper.js';
import jwt from 'jsonwebtoken';

const service = new StudentService();

export default class StudentController {

    getStudents = async (req, res) => {
        try {
            const students = await service.getAllStudents();
            res.status(200).send(students);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    getStudentById = async (req, res) => {
        try {
            const student = await service.getStudentById(req.params.id)
            res.status(200).send(student);
        } catch (err) {
            res.status(404).send(err.message);
        }
    }

    getStudentLogin = async (req, res) => {
        req.body.password = passwordToHash(req.body.password);
        service.getStudentLogin(req.body).then(async (loggedUser) => {
            if (loggedUser === null) return res.status(404).send({ error: "no user." });
            if (!loggedUser.dataValues) return res.status(404).send({ error: "no user." });
            else {
                const token = await jwt.sign(
                    { id: loggedUser.id, email: loggedUser.email, isStudent: true },
                    process.env.TOKEN_KEY
                );
                const { email, id } = loggedUser.dataValues
                return res.status(201).json({ email, id, token, isStudent: true });
            }
        }).catch(err => res.status(404).send(err.message))
    }

    createStudent = async (req, res) => {
        try {
            req.body.password = passwordToHash(req.body.password);
            req.body.studentNumber = Math.floor(Math.random() * 1000000000).toString();
            service.createStudent(req.body).then(async (createdUser) => {
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

    updateStudent = async (req, res) => {
        try {
            req.body.password = passwordToHash(req.body.password);
            const user = await service.getStudentById(req.params.id);
            console.log(user);
            if(user.dataValues.password != req.body.password){
                return res.status(404).json({error: "Password is wrong"});
            }
            else{
                await service.updateStudentById(req.params.id, req.body);
            }
            res.status(201).json({ "message": "Student Updated" });
        } catch (err) {
            res.status(404).send(err.message);
        }
    }

    deleteStudent = async (req, res) => {
        try {
            await service.deleteStudentById(req.params.id);
            res.status(200).json({ "message": "Student Deleted" });
        }
        catch (err) {
            res.status(404).send(err.message);
        }
    }
}