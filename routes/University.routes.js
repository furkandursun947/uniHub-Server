import express from "express";
import UniversityControllerImpl from "../controllers/University.controller.js";


const router = express.Router();
const UniversityController = new UniversityControllerImpl();

/**
 * @swagger
 * /universities:
 *  get:
 *    summary: Get All Universities
 *    tags: [University]    
 *    responses:
 *     200:
 *      description: Get All Universities.
 *     500:
 *      description: Interval Server Error.   
*/
router.get('/universities', UniversityController.getAllUniversities);

/**
 * @swagger
 * /universities/{id}:
 *  get:
 *   summary: Get University By Id
 *   tags: [University]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *   responses:
 *    200:
 *     description: Get University By Id. 
 *    404:
 *     description: Not Found.   
*/
router.get('/universities/:id', UniversityController.getUniversityById);

/**
 * @swagger
 * /universities:
 *  post:
 *   summary: Create University
 *   tags: [University]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/University'
 *   responses:
 *    201:
 *     description: University Created. 
 *    400:
 *     description: Bad Ruquest.   
*/
router.post('/universities', UniversityController.createUniversity);

/**
 * @swagger
 * /universities/{universityId}/{teacherId}:
 *  post:
 *   summary: Add Teacher To University
 *   tags: [University]
 *   parameters:
 *    - in: path
 *      name: universityId
 *      required: true
 *    - in: path
 *      name: teacherId
 *      required: true
 *   responses:
 *    201:
 *     description: Teacher Added to University. 
 *    404:
 *     description: Not Found.   
*/
router.post('/universities/:universityId/:teacherId', UniversityController.addTeacherToUniversity);



export default router;
