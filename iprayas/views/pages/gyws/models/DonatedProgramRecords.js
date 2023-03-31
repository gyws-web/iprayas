module.exports = function(sequelize, DataTypes) {
    return sequelize.define('DonatedProgramRecords', {
      dpr_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      donation_program_id:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      count:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      amount:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      razorpay_order_id:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      interval:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      period:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
    },{
      tableName: 'donatedprogramrecords' // THIS LINE HERE
    });
  };
    