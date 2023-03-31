module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Role', {
      role_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique:true
      },
      priority:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      active:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
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
      tableName: 'roles' // THIS LINE HERE
    });
  };