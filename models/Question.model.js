export default function QuestionModel(sequelize, DataTypes) {

    const Question = sequelize.define('Question', {
        id: {
            primaryKey: true,
            type: DataTypes.DOUBLE,
            autoIncrement: true,
        },
        question: {
            type: DataTypes.STRING,
        },
        imagePath: {
            type: DataTypes.STRING,
        },
        choice1: {
            type: DataTypes.STRING,
        },
        choice2: {
            type: DataTypes.STRING,
        },
        choice3: {
            type: DataTypes.STRING,
        },
        choice4: {
            type: DataTypes.STRING,
        },
        answer: {
            type: DataTypes.STRING,
        }
    },{
      freezeTableName: true
    });  
    return Question;
};