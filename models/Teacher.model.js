export default function TeacherModel (sequelize, DataTypes) {
    
    const Teacher = sequelize.define("Teacher", {
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
            unique: 'phone',
        },
        email: {
            type: DataTypes.STRING,
            unique: 'email',
        },
        teacherNumber: {
            type: DataTypes.STRING,
            unique: 'teacherNumber',
        },
        password: {
            type: DataTypes.STRING,
        },
        isRector: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isAssigned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
      freezeTableName: true
    });
      
    return Teacher;
};