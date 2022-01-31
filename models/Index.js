import config from "../config/db.config.js";
import { Sequelize } from "sequelize";
import TeacherModel from "./Teacher.model.js";
import CourseModel from "./Course.model.js";
import StudentModel from "./Student.model.js";
import HomeworkModel from "./Homework.model.js";
import UniversityModel from "./University.model.js";
import StudentHasHomeworkModel from "./StudentHasHomework.model.js";
import StudentHasCourseModel from "./StudentHasCourse.model.js";
import ExamModel from "./Exam.model.js";
import QuestionModel from "./Question.model.js";
import StudentHasExamModel from "./StudentHasExam.model.js";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    pool: config.pool,
    logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Teacher = TeacherModel(sequelize, Sequelize);
db.Course = CourseModel(sequelize, Sequelize);
db.Student = StudentModel(sequelize, Sequelize);
db.Homework = HomeworkModel(sequelize, Sequelize);
db.University = UniversityModel(sequelize, Sequelize);
db.StudentHasHomework = StudentHasHomeworkModel(sequelize, Sequelize);
db.StudentHasCourse = StudentHasCourseModel(sequelize, Sequelize);
db.Exam = ExamModel(sequelize, Sequelize);
db.Question = QuestionModel(sequelize, Sequelize)
db.StudentHasExam = StudentHasExamModel(sequelize, Sequelize)

db.University.hasMany(db.Teacher, { as: "teachers" });
db.Teacher.belongsTo(db.University, { foreingKey: 'universityId', });

db.Teacher.hasMany(db.Course, { as: "courses" });
db.Course.belongsTo(db.Teacher, { foreingKey: 'teacherId', });

db.Course.hasMany(db.Homework, { as: "homeworks" });
db.Homework.belongsTo(db.Course, { foreingKey: 'courseId', });

db.Student.belongsToMany(db.Course, { through: db.StudentHasCourse });
db.Course.belongsToMany(db.Student, { through: db.StudentHasCourse });

db.Student.belongsToMany(db.Homework, { through: db.StudentHasHomework });
db.Homework.belongsToMany(db.Student, { through: db.StudentHasHomework });

db.Course.hasMany(db.Exam, { as: "exams" });
db.Exam.belongsTo(db.Course, { foreingKey: 'courseId' });

db.Exam.hasMany(db.Question, { as: "questions" });
db.Question.belongsTo(db.Exam, { foreingKey: 'examId' });

db.Exam.belongsToMany(db.Student, { through: db.StudentHasExam });
db.Student.belongsToMany(db.Exam, { through: db.StudentHasExam });

await db.sequelize.sync({ alter: false, force: false });

export default db;