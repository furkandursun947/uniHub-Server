export default function ExamModel(sequelize, DataTypes) {

    const Exam = sequelize.define('Exam', {
        id: {
            primaryKey: true,
            type: DataTypes.DOUBLE,
            autoIncrement: true,
        },
        examName: {
            type: DataTypes.STRING,
        },
        startDate: {
            type: DataTypes.STRING,
        },
        deadLine: {
            type: DataTypes.STRING,
        },
        weight: {
            type: DataTypes.INTEGER
        }
    },{
      freezeTableName: true
    });  
    return Exam;
};