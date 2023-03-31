module.exports = function(sequelize, DataTypes) {
    const Event = sequelize.define('Event', {
      event_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      tag_id:{
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      date:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      thumbnail:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      active:{
        type: DataTypes.ENUM('Enable','Disable'),
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
      tableName: 'events' // THIS LINE HERE
    });

    Event.associate = function(models) {
        Event.hasMany(models.EventImage, {as: 'event_images', foreignKey: 'event_id'});
    };

    return Event;

  };
    