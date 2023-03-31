module.exports = function(sequelize, DataTypes) {
    const StudentClass = sequelize.define('StudentClass', {
      sc_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      standard:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      section:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      roll:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      academic_session:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      report1:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      report2:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      report3:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      report4:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      pass_or_fail:{
        type: DataTypes.STRING(255),
        allowNull: true
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
      tableName: 'studentclasses' // THIS LINE HERE
    });


    return StudentClass;
  };