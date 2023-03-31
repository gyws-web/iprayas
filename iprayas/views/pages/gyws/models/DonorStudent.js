module.exports = function(sequelize, DataTypes) {
    const DonorStudent = sequelize.define('DonorStudent', {
      donor_student_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      academic_session:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      donor_id:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      donation_program_id:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      student_id:{
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
      tableName: 'donorstudents' // THIS LINE HERE
    });

    return DonorStudent;
  };
    