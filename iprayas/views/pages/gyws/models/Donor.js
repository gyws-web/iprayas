module.exports = function(sequelize, DataTypes) {
    const Donor = sequelize.define('Donor', {
      donor_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username:{
        type: DataTypes.STRING(255),
        allowNull: true,
        unique:true
      },
      password:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email:{
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      name:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      country_code_1:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      contact_no:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      country_code_2:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      alt_contact_no:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      country: {
        type:DataTypes.STRING(255),
        allowNull:true
      },
      state: {
        type:DataTypes.STRING(255),
        allowNull:true
      },
      city: {
        type:DataTypes.STRING(255),
        allowNull:true
      },
      pin: {
        type:DataTypes.STRING(255),
        allowNull:true
      },
      address: {
        type:DataTypes.TEXT,
        allowNull:true
      },
      photo: {
        type:DataTypes.STRING(255),
        allowNull:true
      },
      source: {
        type:DataTypes.STRING(255),
        allowNull:true
      },
      member_concerned: {
        type:DataTypes.STRING(255),
        allowNull:true
      },
      institute: {
        type:DataTypes.STRING(255),
        allowNull:true
      },
      aadhar:{
        type:DataTypes.STRING(255),
        allowNull:true
      },
      pan:{
        type:DataTypes.STRING(255),
        allowNull:true
      },
      donor_category_id:{
        type:DataTypes.INTEGER(11),
        allowNull:true
      },
      active:{
        type: DataTypes.ENUM('Yes','No','Blocked'),
        defaultValue: 'No',
        allowNull: false
      },
      createdBy: {
        type: DataTypes.STRING(255),
        allowNull:true
      },
      updatedBy:{
        type: DataTypes.STRING(255),
        allowNull:true
      } 
    },{
      tableName: 'donors' // THIS LINE HERE
    });

    Donor.associate = function(models) {
        Donor.hasMany(models.DonationHistory, {as: 'donation_history', foreignKey: 'donor_id'});
    };

    return Donor;
  };
    