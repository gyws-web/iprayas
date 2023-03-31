module.exports = function(sequelize, DataTypes) {
    const Student =  sequelize.define('Student', {
      student_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      father_name:{
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      mother_name:{
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      photo:{
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      gender:{
        type: DataTypes.ENUM("M","F"),
        allowNull: false,
      },
      address:{
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      contact_no:{
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      left:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      leave_reason: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.INTEGER(11),
        allowNull:false
      },
      updatedBy:{
        type: DataTypes.INTEGER(11),
        allowNull:true
      } 
    },{
      tableName: 'students' // THIS LINE HERE
    });

    Student.associate = function(models) {
        Student.hasMany(models.StudentClass, {as: 'student_class', foreignKey: 'student_id'});
    };

    return Student;
  };