import express from "express";
import CourseControllerImpl from "../controllers/Course.controller.js";
import multer from 'multer';
import crypto from "crypto";

const router = express.Router();

const CourseController = new CourseControllerImpl()

/**
 * @swagger
 * /courses:
 *  get:
 *    summary: Get All Courses
 *    tags: [Course]    
 *    responses:
 *     200:
 *      description: Get All Courses.
 *     500:
 *      description: Interval Server Error.   
*/
router.get('/courses', CourseController.getAllCourses);

/**
 * @swagger
 * /courses/{id}:
 *  get:
 *   summary: Get Course By Id
 *   tags: [Course]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *   responses:
 *    200:
 *     description: Get Course By Id. 
 *    404:
 *     description: Not Found.   
*/
router.get('/courses/:id', CourseController.getCourseById);


/**
 * @swagger
 * /get-student-homework:
 *  post:
 *   summary: Get Student Homework
 *   tags: [Homework]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required:
 *         - studentId
 *         - homeworkId
 *       properties:
 *         studentId:
 *           type: string
 *           description: Student Id
 *         homeworkId:
 *           type: string
 *           description: Homework Id
 *   responses:
 *    201:
 *     description: Get Student Homework. 
 *    400:
 *     description: Bad Request.  
*/
router.post('/get-course-by-student-id', CourseController.getStudentHomework);

/**
 * @swagger
 * /courses:
 *  post:
 *   summary: Create Course
 *   tags: [Course]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Course'
 *   responses:
 *    201:
 *     description: Successfully Created. 
 *    400:
 *     description: Bad Request.  
*/
router.post('/courses', CourseController.createCourse);

/**
 * @swagger
 * /courses/update-homework-grades/{homeworkId}:
 *  post:
 *   summary: Update Homework Grades
 *   tags: [Homework]
 *   parameters:
 *    - in: path
 *      name: homeworkId
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Homework'
 *   responses:
 *    201:
 *     description: Successfully Updated. 
 *    400:
 *     description: Bad Request.  
*/
router.post('/courses/update-homework-grades/:homeworkId', CourseController.updateHomeworkGrades)

/**
 * @swagger
 * /courses/{id}/{studentId}:
 *  post:
 *   summary: Add Student to Course
 *   tags: [Course]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
*    - in: path
 *      name: studentId
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Homework'
 *   responses:
 *    201:
 *     description: Successfully Added. 
 *    400:
 *     description: Bad Request.  
*/
router.post('/courses/:id/:studentId', CourseController.addStudentToCourse);

/**
 * @swagger
 * /courses/get-homework/{id}:
 *  get:
 *   summary: Get Homework By Id
 *   tags: [Homework]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *   responses:
 *    200:
 *     description: Get Homework By Id. 
 *    400:
 *     description: Bad Request.  
*/
router.get('/courses/get-homework/:id', CourseController.getHomeworkById)

/**
 * @swagger
 * /courses/update-homework/{id}:
 *  put:
 *   summary: Teacher Update Homework
 *   tags: [Homework]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Homework'
 *   responses:
 *    201:
 *     description: Successfully Updated. 
 *    400:
 *     description: Bad Request.  
*/
const storageForTeacherHomework = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/Homeworks/FromTeacher/")
    },
    filename: (req, file, cb) => {
        cb(null, crypto.randomBytes(20).toString('hex') + "-" + file.originalname);
    },
})
const uploadTeacherHomework = multer({ storage: storageForTeacherHomework });
router.put('/courses/update-homework/:id', uploadTeacherHomework.array('files'), CourseController.updateHomework)

/**
 * @swagger
 * /courses1/{courseId}/addHomework:
 *  post:
 *   summary: Teacher Add Homework
 *   tags: [Homework]
 *   parameters:
 *    - in: path
 *      name: courseId
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Homework'
 *   responses:
 *    201:
 *     description: Successfully Added. 
 *    400:
 *     description: Bad Request.  
*/
router.post('/courses1/:courseId/addHomework', uploadTeacherHomework.array('files'), CourseController.addHomeworkToTheCourse);

/**
 * @swagger
 * /courses/add-students-homework:
 *  post:
 *   summary: Student Add Homework
 *   tags: [Homework]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required:
 *         - studentId
 *         - homeworkId
 *       properties:
 *         studentId:
 *           type: string
 *           description: Student Id
 *         homeworkId:
 *           type: string
 *           description: Homework Id
 *         filePath:
 *           type: string
 *           description: File Path
 *   responses:
 *    201:
 *     description: Successfully Added. 
 *    400:
 *     description: Bad Request.  
*/
const storageForStudentHomework = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/Homeworks/FromStudent/")
    },
    filename: (req, file, cb) => {
        cb(null, crypto.randomBytes(20).toString('hex') + "-" + file.originalname);
    },
})
const uploadStudentHomework = multer({ storage: storageForStudentHomework });
router.post('/courses/add-students-homework', uploadStudentHomework.array('files'), CourseController.addStudentHomeworkFile);

/**
 * @swagger
 * /courses/update-students-homework:
 *  put:
 *   summary: Student Update Homework
 *   tags: [Homework]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required:
 *         - studentId
 *         - homeworkId
 *       properties:
 *         studentId:
 *           type: string
 *           description: Student Id
 *         homeworkId:
 *           type: string
 *           description: Homework Id
 *         filePath:
 *           type: string
 *           description: File Path
 *   responses:
 *    201:
 *     description: Successfully Updated. 
 *    400:
 *     description: Bad Request.  
*/
router.put('/courses/update-students-homework', uploadStudentHomework.array('files'), CourseController.updateStudentHomeworkFile);

/**
 * @swagger
 * /courses1/{id}/deleteHomework:
 *  delete:
 *   summary: Delete Teacher Homework
 *   tags: [Homework]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *   responses:
 *    201:
 *     description: Successfully Deleted. 
 *    400:
 *     description: Bad Request.  
*/
router.delete('/courses1/:id/deleteHomework', CourseController.deleteTeacherHomework);

/**
 * @swagger
 * /courses1/{courseId}/addExam:
 *  post:
 *   summary: Teacher Add Exam
 *   tags: [Exam]
 *   parameters:
 *    - in: path
 *      name: courseId
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Question'
 *         exam:
 *           $ref: '#/components/schemas/Exam'
 *         files:
 *           type: array
 *           items:
 *             type: string
 *   responses:
 *    201:
 *     description: Successfully Added. 
 *    400:
 *     description: Bad Request.  
*/
const storageForExam = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/Exams/")
    },
    filename: (req, file, cb) => {
        cb(null, crypto.randomBytes(20).toString('hex') + "-" + file.originalname.replace(" ", "-"));
    },
})
const uploadExam = multer({ storage: storageForExam });
router.post('/courses1/:courseId/addExam', uploadExam.array('files'), CourseController.addExamToCourse);

/**
 * @swagger
 * /courses3/getExam/{examId}:
 *  post:
 *   summary: Get Exam
 *   tags: [Exam]
 *   parameters:
 *    - in: path
 *      name: examId
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *         date:
 *           type: string        
 *   responses:
 *    201:
 *     description: Get Exam. 
 *    400:
 *     description: Bad Request.  
*/
router.post('/courses3/getExam/:examId', CourseController.getExamById);

/**
 * @swagger
 * /courses/addExamResult:
 *  post:
 *   summary: Save Exam Result
 *   tags: [Exam]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required:
 *         - studentId
 *         - homeworkId
 *       properties:
 *         studentId:
 *           type: string
 *           description: Student Id
 *         examId:
 *           type: string
 *           description: Homework Id
 *         point:
 *           type: string
 *           description: File Path     
 *   responses:
 *    201:
 *     description: Exam Successfully Saved.
 *    400:
 *     description: Bad Request.  
*/
router.post('/courses/addExamResult', CourseController.saveExamResultById);

/**
 * @swagger
 * /courses/{id}:
 *  put:
 *   summary: Update Course
 *   tags: [Course]
 *   parameters:
 *    - in: path
 *      name: examId
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Course'
 *   responses:
 *    201:
 *     description: Course Successfully Updated. 
 *    400:
 *     description: Bad Request.  
*/
router.put('/courses/:id', CourseController.updateCourse);

/**
 * @swagger
 * /update-exam/{id}:
 *  put:
 *   summary: Update Exam
 *   tags: [Exam]
 *   parameters:
 *    - in: path
 *      name: examId
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Question'
 *         exam:
 *           $ref: '#/components/schemas/Exam'
 *   responses:
 *    201:
 *     description: Exam Successfully Updated. 
 *    400:
 *     description: Bad Request.  
*/
router.put('/update-exam/:id', CourseController.updateExam);


router.get('/finish-course/:id', CourseController.finishCourse)


export default router;



/**
  * @swagger
  * tags:
  *   name: Course
  *   description: The Course managing API
*/
/**
  * @swagger
  * tags:
  *   name: Exam
  *   description: The Exam managing API
*/
/**
  * @swagger
  * tags:
  *   name: Homework
  *   description: The Homework managing API
*/
/**
  * @swagger
  * tags:
  *   name: Teacher
  *   description: The Teacher managing API
*/
/**
  * @swagger
  * tags:
  *   name: Student
  *   description: The Student managing API
*/
/**
  * @swagger
  * tags:
  *   name: University
  *   description: The University managing API
*/
/**
 * @swagger
 * components:
 *   schemas: 
 * 
 *     Course:
 *       type: object
 *       required:
 *         - courseName
 *         - crn
 *       properties:
 *         id:
 *           type: string
 *           description: Id of the Course
 *         crn:
 *           type: string
 *           description: CRN of the Course
 *         courseName:
 *           type: string
 *           description: Name of the Course
 *         zoomLink:
 *           type: string
 *           description: Zoom Link of the Course
 *         day:
 *           type: number
 *           description: Day Number of Course
 *         duration:
 *           type: number
 *           description: Duration of Course (min)
 *         startTime:
 *           type: string
 *           description: Start Time of Course (HH:mm)
 *         studentCount:
 *           type: number
 *           description: Number of Student
 *         capacity:
 *           type: number
 *           description: Student Capacity of the Course
 *         price:
 *           type: number
 *           description: Course Price
 * 
 *     Homework:
 *       type: object
 *       properties: 
 *          homeworkName:
 *           type: string
 *           description: Name of the homework
 *          weight:
 *           type: integer
 *           description: Weight the homework
 *          filePath:
 *           type: string
 *           description: File of the homework
 *          deadline:
 *           type: string
 *           description: Deadline of the homework
 * 
 *     Exam:
 *        type: object
 *        properties:
 *          examName:
 *            type: string
 *            description: Name of the Exam
 *          startDate:
 *            type: string
 *            description: Start Date of the Exam
 *          deadLine:
 *            type: string
 *            description: Deadline of the Exam
 *          weight:
 *            type: number
 *            description: Weight of the Exam
 * 
 *     Question:
 *       type: object
 *       properties:
 *          question:
 *            type: string
 *            description: Question
 *          imagePath:
 *            type: string
 *            description: Image path of Question
 *          choice1:
 *            type: string
 *            description: Choice 1 of Quesiton
 *          choice2:
 *            type: string
 *            description: Choice 2 of Quesiton
 *          choice3:
 *            type: string
 *            description: Choice 3 of Quesiton
 *          choice4:
 *            type: string
 *            description: Choice 4 of Quesiton
 *          answer:
 *            type: string
 *            description: Answer of Quesiton
 *     Student:
 *       type: object
 *       properties:
 *          fullName:
 *            type: string
 *            description: Full Name of Student
 *          phone:
 *            type: string
 *            description: Phone of Student
 *          email:
 *            type: string
 *            description: Email of Student
 *          password:
 *            type: string
 *            description: Password of Student
 * 
 *     Teacher:
 *       type: object
 *       properties:
 *          fullName:
 *            type: string
 *            description: Full Name of Teacher
 *          phone:
 *            type: string
 *            description: Phone of Teacher
 *          email:
 *            type: string
 *            description: Email of Teacher
 *          password:
 *            type: string
 *            description: Password of Teacher
 * 
 *     University:
 *       type: object
 *       properties:
 *          name:
 *            type: string
 *            description: Name of University
 *          phone:
 *            type: string
 *            description: Phone of University
 *          address:
 *            type: string
 *            description: Address of University
 *          imageUrl:
 *            type: string
 *            description: Image Url of University
 *          foundationYear:
 *            type: string
 *            description: Foundation Year of University
 * 
 * 
 *       
 */