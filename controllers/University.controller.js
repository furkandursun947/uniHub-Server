import UniversityService from '../services/UniversityService.js';

const service = new UniversityService();

export default class UniversityController {

    createUniversity = async (req, res) => {
        try {
            service.createUniversity(req.body);
            res.status(201).send("University has created successfully!");
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
    
    getAllUniversities = async (req, res) => {
        try {
            const universities = await service.getAllUniversities();
            res.status(200).send(universities);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    
    getUniversityById = async (req, res) => {
        try {
            const university = await service.getUniversityById(req.params.id);
            res.status(200).send(university);
        } catch (err) {
            res.status(404).send(err.message);
        }
    }
    
    addTeacherToUniversity = async (req, res) => {
        try {
            await service.addTeacherToUniversity(req.params.teacherId, req.params.universityId);
            res.status(201).send("Teacher successfully added to the University!");
        } catch (err) {
            res.status(404).send(err.message);
        }
    }

}