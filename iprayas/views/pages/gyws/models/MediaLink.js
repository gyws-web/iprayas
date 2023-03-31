module.exports = function(sequelize, DataTypes) {
    const MediaLink = sequelize.define('MediaLink', {
      media_link_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      facebook:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      youtube:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      linkedin:{
        type: DataTypes.STRING(255),
        allowNull: true
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
      tableName: 'medialinks' // THIS LINE HERE
    });

    return MediaLink;

  };
    