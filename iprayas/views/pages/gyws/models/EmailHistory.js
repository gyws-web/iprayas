module.exports = function(sequelize, DataTypes) {
    const EmailHistory = sequelize.define('EmailHistory', {
      email_history_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      recipient_id:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      recipient_name:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      recipient_email:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      recipient_type:{
        type: DataTypes.ENUM('Donor','Operator'),
        allowNull: false
      },
      sender_id:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      sender_type:{
        type: DataTypes.ENUM('Admin','Operator'),
        allowNull: false
      },
      subject:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      message:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      status:{
        type: DataTypes.ENUM('Sent','Failed'),
        allowNull: false,
      },
      updatedBy:{
        type: DataTypes.STRING(255),
        allowNull:true
      } 
    },{
      tableName: 'emailhistories' // THIS LINE HERE
    });

    return EmailHistory;
  };
    