export default function HomeworkModel(sequelize, DataTypes) {

    const Homework = sequelize.define('Homework', {
        id: {
            primaryKey: true,
            type: DataTypes.DOUBLE,
            autoIncrement: true,
        },
        homeworkName: {
            type: DataTypes.STRING,
        },
        filePath: {
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
    return Homework;
};