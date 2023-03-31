module.exports = function(sequelize, DataTypes) {
    const donationProgram = sequelize.define('DonationProgram', {
      donation_program_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      program_name:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      program_id:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      program_type:{
        type: DataTypes.ENUM('Onetime','Subscription'),
        allowNull: true
      },
      photo:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      tax_benifit:{
        type: DataTypes.TEXT,
        allowNull: true
      },
      amount_type:{
        type: DataTypes.ENUM('Fixed','Flexible'),
        allowNull: true
      },
      cost:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      description:{
        type: DataTypes.TEXT,
        allowNull: true
      },
      donor_signup_required:{
        type: DataTypes.ENUM('Yes','No'),
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
      tableName: 'donationprograms' // THIS LINE HERE
    });

    donationProgram.associate = function(models) {
      donationProgram.belongsTo(models.DonationCategory, {as: 'donation_category', foreignKey: 'donation_category_id'});
  };


    return donationProgram;

  };
    