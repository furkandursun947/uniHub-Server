import express from "express";
import TeacherControllerImpl from "../controllers/Teacher.controller.js";
import verifyToken from '../middleware/authentication.js';

const router = express.Router();
const TeacherController = new TeacherControllerImpl();

/**
 * @swagger
 * /teachers:
 *  get:
 *    summary: Get All Teachers
 *    tags: [Teacher]    
 *    responses:
 *     200:
 *      description: Get All Teachers.
 *     500:
 *      description: Interval Server Error.   
*/
router.get('/teachers', TeacherController.getTeachers);

/**
 * @swagger
 * /teachers/{id}:
 *  get:
 *   summary: Get Teacher By Id
 *   tags: [Teacher]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *   responses:
 *    200:
 *     description: Get Teacher By Id. 
 *    404:
 *     description: Not Found.   
*/
router.get('/teachers/:id', TeacherController.getTeacherById);




/**
 * @swagger
 * /teachers/login:
 *  post:
 *   summary: Login Teacher
 *   tags: [Teacher]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Teacher'
 *   responses:
 *    200:
 *     description: Teacher Found. 
 *    400:
 *     description: Bad Ruquest.   
*/
router.post('/teachers/login', TeacherController.getTeacherLogin);


router.get('/login-with-token', verifyToken, TeacherController.loginWithToken);

/**
 * @swagger
 * /teachers:
 *  post:
 *   summary: Create Teacher
 *   tags: [Teacher]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Teacher'
 *   responses:
 *    201:
 *     description: Teacher Created. 
 *    400:
 *     description: Bad Ruquest.   
*/
router.post('/teachers', TeacherController.createTeacher);

/**
 * @swagger
 * /teachers:
 *  put:
 *   summary: Update Teacher
 *   tags: [Teacher]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Teacher'
 *   responses:
 *    201:
 *     description: Teacher Updated. 
 *    400:
 *     description: Bad Ruquest.   
*/
router.put('/teachers/:id', TeacherController.updateTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *  delete:
 *   summary: Delete Teacher By Id
 *   tags: [Teacher]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *   responses:
 *    200:
 *     description: Teacher Deleted. 
 *    404:
 *     description: Not Found.   
*/
router.delete('/teachers/:id', TeacherController.deleteTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *  post:
 *   summary: Add Course to Teacher
 *   tags: [Teacher]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Course'
 *   responses:
 *    201:
 *     description: Course added to Teacher. 
 *    400:
 *     description: Bad Ruquest.   
*/
router.post('/teachers/:id', TeacherController.addCourseToTeacher);

/**
 * @swagger
 * /get-unassigned-teachers:
 *  get:
 *   summary: Get Unassigned Teachers
 *   tags: [Teacher]
 *   responses:
 *    200:
 *     description: Get Unassigned Teachers. 
 *    400:
 *     description: Bad Ruquest.   
*/
router.get('/get-unassigned-teachers', TeacherController.getUnassignTeachers);

/**
 * @swagger
 * /assign-teachers:
 *  post:
 *   summary: Assign Teachers
 *   tags: [Teacher]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *         universityId:
 *           type: string
 *           description: University Id
 *         teacherIds:
 *           description: Teacher Id
 *           type: array
 *           items:
 *             type: string
 *              
 *   responses:
 *    200:
 *     description: Assing Teachers. 
 *    400:
 *     description: Bad Ruquest.   
*/
router.post('/assign-teachers', TeacherController.assignTeachers);

/**
 * @swagger
 * /unassign-teachers:
 *  post:
 *   summary: Remove Teachers
 *   tags: [Teacher]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *         teacherId:
 *           type: string
 *           description: Teacher Id
 *              
 *   responses:
 *    200:
 *     description: Unassign Teachers. 
 *    400:
 *     description: Bad Ruquest.   
*/
router.post('/unassign-teachers', TeacherController.unAssignTeacher);


export default router;
