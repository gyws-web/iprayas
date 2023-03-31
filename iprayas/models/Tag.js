module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Tag', {
      tag_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      active:{
        type: DataTypes.ENUM('Yes','No'),
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
      tableName: 'tags' // THIS LINE HERE
    });
  };
    