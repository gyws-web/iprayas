module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique:true
      },
      password:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      name:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      mobile:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      role: {
        type:DataTypes.INTEGER(11),
        allowNull:true
      },
      active:{
        type: DataTypes.ENUM('Yes','No','Blocked'),
        defaultValue: 'No',
        allowNull: false
      },
      createdBy: {
        type: DataTypes.STRING(255),
        allowNull:false
      },
      updatedBy:{
        type: DataTypes.STRING(255),
        allowNull:true
      } 
    },{
      tableName: 'users' // THIS LINE HERE
    });
  };
    