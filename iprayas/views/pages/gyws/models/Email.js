module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Email', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      type:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      type_id:{
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      subject: {
        type: DataTypes.TEXT(),
        allowNull:false
      },
      body:{
        type: DataTypes.TEXT(),
        allowNull:true
      },
      status:{
        type: DataTypes.INTEGER(11),
        allowNull:false
      },
      createdAt: {
        type: DataTypes.STRING(255),
        allowNull:false
      },
      updatedAt:{
        type: DataTypes.STRING(255),
        allowNull:true
      }
    },{
      tableName: 'email' // THIS LINE HERE
    });
  };
