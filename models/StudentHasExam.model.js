export default function StudentHasExamModel (sequelize, DataTypes) {
    
    const StudentHasExamModel = sequelize.define("StudentHasExam", {
        note: {
            type: DataTypes.DOUBLE
        },
    });
      
    return StudentHasExamModel;
};