module.exports = function(sequelize, DataTypes) {
    const EventImage = sequelize.define('EventImage', {
      event_image_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      image:{
        type: DataTypes.STRING(255),
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
      tableName: 'eventimages' // THIS LINE HERE
    });

    return EventImage;
  };
    