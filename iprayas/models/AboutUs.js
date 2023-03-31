module.exports = function(sequelize, DataTypes) {
    return sequelize.define('AboutUs', {
    aboutus_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      who_we_are:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      our_history:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      our_vision:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      our_mission:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      founders_message:{
        type: DataTypes.TEXT,
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
      tableName: 'aboutus' // THIS LINE HERE
    });
  };