module.exports = function(sequelize, DataTypes) {
    return sequelize.define('DonationHistory', {
      donation_history_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      receipt:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      currency:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      amount:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      razorpay_receipt:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      razorpay_amount:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      razorpay_order_id:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      razorpay_entity:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      razorpay_status:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      razorpay_notes:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      razorpay_created_at:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      renewal:{
        type: DataTypes.ENUM('New','Renewal','Donated-Not Last Year'),
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
      tableName: 'donationhistories' // THIS LINE HERE
    });
  };
    