module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Expense', {
      expense_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      expense_name:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique:true
      },
      date:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      amount:{
        type: DataTypes.STRING(255),
        allowNull: false,
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
      tableName: 'expenses' // THIS LINE HERE
    });
  };