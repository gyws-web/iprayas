module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Testimonial', {
      testimonial_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      designation:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      photo:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      testimonial:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      active:{
        type: DataTypes.ENUM('Yes','No'),
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
      tableName: 'testimonials' // THIS LINE HERE
    });
  };
    