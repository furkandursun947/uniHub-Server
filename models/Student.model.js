export default function StudentModel (sequelize, DataTypes) {
    
    const Student = sequelize.define('Student', {
        id: {
            primaryKey: true,
            type: DataTypes.DOUBLE,
            autoIncrement: true,
        },
        fullName: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        studentNumber: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        gpa: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        }
    },{
      freezeTableName: true
    });
      
    return Student;
};