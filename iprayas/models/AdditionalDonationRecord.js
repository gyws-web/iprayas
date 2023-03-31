module.exports = function(sequelize, DataTypes) {
    const AdditionalDonationRecord = sequelize.define('AdditionalDonationRecord', {
    add_don_record_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      type:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      amount:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      name:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      mobile:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      date:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      transaction_id:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      defaulter_month:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      payment_option:{
        //type: DataTypes.ENUM('Cheque','Cash','Bank Transfer','SI Form','CSR'),
        type: DataTypes.STRING(255),
        allowNull: true
      },
      renewal:{
        //type: DataTypes.ENUM('New','Renewal','Donated-Not Last Year'),
        type: DataTypes.STRING(255),
        allowNull: true
      },
      payment_received:{
        //type: DataTypes.ENUM('Yes','No'),
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
      tableName: 'additionaldonationrecord'
    });


    return AdditionalDonationRecord;

  };
    