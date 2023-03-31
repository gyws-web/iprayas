module.exports = function(sequelize, DataTypes) {
    const Report = sequelize.define('Report', {
      report_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      report_type:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      title:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      file:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      year:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      month:{
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
      tableName: 'reports' // THIS LINE HERE
    });

    return Report;

  };
    