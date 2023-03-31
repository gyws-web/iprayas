module.exports = function(sequelize, DataTypes) {
    const BlogTags = sequelize.define('BlogTags', {
      blog_tag_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tag:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      permalink:{
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
      tableName: 'blogtags' // THIS LINE HERE
    });

    return BlogTags;

  };
    