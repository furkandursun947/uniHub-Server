export default function StudentHasCourseModel (sequelize, DataTypes) {
    
    const StudentHasCourseModel = sequelize.define("StudentHasCourse", {
        grade: {
            type: DataTypes.DOUBLE
        },
        isFinished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
      
    return StudentHasCourseModel;
};