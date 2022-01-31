import express from "express";
import StudentControllerImpl from "../controllers/Student.controller.js";
import verifyToken from '../middleware/authentication.js';


const router = express.Router();
const StudentController = new StudentControllerImpl();

/**
 * @swagger
 * /students:
 *  get:
 *    summary: Get All Students
 *    tags: [Students]    
 *    responses:
 *     200:
 *      description: Get All Students.
 *     500:
 *      description: Interval Server Error.   
*/
router.get('/students', StudentController.getStudents);

/**
 * @swagger
 * /students/{id}:
 *  get:
 *   summary: Get Student By Id
 *   tags: [Students]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *   responses:
 *    200:
 *     description: Get Student By Id. 
 *    404:
 *     description: Not Found.   
*/
router.get('/students/:id', StudentController.getStudentById);

/**
 * @swagger
 * /students/login:
 *  post:
 *   summary: Login Student
 *   tags: [Students]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Student'
 *   responses:
 *    200:
 *     description: Student Found. 
 *    400:
 *     description: Bad Ruquest.   
*/
router.post('/students/login', StudentController.getStudentLogin);


/**
 * @swagger
 * /students:
 *  post:
 *   summary: Create Student
 *   tags: [Students]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Student'
 *   responses:
 *    201:
 *     description: Student Created. 
 *    400:
 *     description: Bad Ruquest.   
*/
router.post('/students', StudentController.createStudent);

/**
 * @swagger
 * /students:
 *  put:
 *   summary: Update a Student
 *   tags: [Students]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Student'
 *   responses:
 *    201:
 *     description: Student Updated. 
 *    400:
 *     description: Bad Ruquest.   
*/
router.put('/students/:id', StudentController.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *  delete:
 *   summary: Delete Student By Id
 *   tags: [Students]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *   responses:
 *    200:
 *     description: Student Deleted. 
 *    404:
 *     description: Not Found.   
*/
router.delete('/students/:id', StudentController.deleteStudent);



export default router;
