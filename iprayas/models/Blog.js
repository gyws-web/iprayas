module.exports = function(sequelize, DataTypes) {
    const Blog = sequelize.define('Blog', {
      blog_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      permalink:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      blog_content:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      featured_image:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      meta_description: {
        type: DataTypes.TEXT,
        allowNull:true
      },
      meta_keywords: {
        type: DataTypes.STRING(255),
        allowNull:true
      },
      active:{
        type: DataTypes.ENUM('Publish','Draft'),
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
      tableName: 'blogs' // THIS LINE HERE
    });

    Blog.associate = function(models) {
      Blog.hasMany(models.BlogTags, {as: 'blog_tags', foreignKey: 'blog_id'});
    };

    return Blog;

  };
    