module.exports = function(sequelize, DataTypes) {
    return sequelize.define('RolePermission', {
      role_permission_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      role_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      //website start//
      role_permission:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      event:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      operator:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      donor:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      //website ends//
/////////////////////////////////////////////////////
      //Donation start//
      donation_program:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      donation_history:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      external_record:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      si_record:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      csr_record:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      //Donation ends//
//////////////////////////////////////////
      //Expenses Record start//
      expense_record:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
       //Expenses Record ends//
//////////////////////////////////////////
       //Reports start //
      newsletter:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      finance:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      annual:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      impact:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
       //Reports ends //
//////////////////////////////////////////////////
       //Payment Information start//
       payment:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
       //Payment Information ends//
//////////////////////////////////////////////////
      media_blog:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      media_link:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
//////////////////////////////////////////////////
      //Student Management start//
      student_enrollment:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      student_class:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      donor_student_allotment:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      //Student Management ends//
//////////////////////////////////////////////////
      //master start//
      role:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      designation:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      member_type:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      donation_category:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      donor_category:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      team:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      initiatives:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
      },
      //master ends//
/////////////////////////////////////////////////////
      
      testimonial:{
        type: DataTypes.ENUM('Yes','No'),
        defaultValue: 'No',
        allowNull: false
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
      tableName: 'roles_permissions' // THIS LINE HERE
    });
  };