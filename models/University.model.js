export default function CourseModel(sequelize, DataTypes) {

    const University = sequelize.define('University', {
        id: {
            primaryKey: true,
            type: DataTypes.DOUBLE,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: 'name'
        },
        phone: {
            type: DataTypes.STRING,
            unique: 'phone'
        },
        address: {
            type: DataTypes.STRING,
        },
        imageUrl: {
            type: DataTypes.STRING,
            defaultValue: "https://i.pinimg.com/originals/19/42/08/194208d903f4cd91acc7cb4b818bddf1.png"
        },
        foundationYear: {
            type: DataTypes.DOUBLE,
        }
    },{
      freezeTableName: true
    });  
    return University;
};