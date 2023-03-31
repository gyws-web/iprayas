module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Initiatives', {
    initiatives_id: {
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
      description:{
        type: DataTypes.TEXT,
        allowNull: true,
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
      tableName: 'initiatives' // THIS LINE HERE
    });
  };