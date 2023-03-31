module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ContactUs', {
      contact_us_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      contact_number:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull:false
      } 
    },{
      tableName: 'contactus' // THIS LINE HERE
    });
  };