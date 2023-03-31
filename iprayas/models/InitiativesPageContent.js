module.exports = function(sequelize, DataTypes) {
    return sequelize.define('InitiativesPageContent', {
      Initiatives_page_content_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      initiatives_id:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: "id of initiatives"
      },
      sub_heading:{
        type: DataTypes.TEXT,
        allowNull: true
      },
      sub_description:{
        type: DataTypes.TEXT,
        allowNull: true
      },
      active:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'Yes',
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
      tableName: 'initiatives_page_content' // THIS LINE HERE
    });
  };