module.exports = function(sequelize, DataTypes) {
    const Operator = sequelize.define('Operator', {
      operator_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email:{
        type: DataTypes.STRING(255),
        allowNull: true,
        unique:true
      },
      password:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      name:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      mobile:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      member_type_id: {
        type:DataTypes.INTEGER(11),
        allowNull:true
      },
      inintiative_id: {
        type:DataTypes.STRING(50),
        allowNull:true
      },
      team_id: {
        type:DataTypes.STRING(50),
        allowNull:true
      },
      photo: {
        type:DataTypes.STRING(255),
        allowNull:true
      },
      department:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      previous_designation_id: {
        type:DataTypes.INTEGER(11),
        allowNull:true
      },
      bio: {
        type:DataTypes.TEXT,
        allowNull:true
      },
      work_done_jem: {
        type:DataTypes.TEXT,
        allowNull:true
      },
      work_done_sem: {
        type:DataTypes.TEXT,
        allowNull:true
      },
      work_done_head: {
        type:DataTypes.TEXT,
        allowNull:true
      },
      work_done_gb: {
        type:DataTypes.TEXT,
        allowNull:true
      },
      linkedin_link:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      facebook_link:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      active:{
        type: DataTypes.ENUM('Enable','Disable','Blocked'),
        allowNull: true
      },
      //new added
      appli_for:{
        type:DataTypes.STRING(50),
        allowNull:true
      },
      dob :{
        type:DataTypes.DATE,
        allowNull:true
      },
      age:{
        type:DataTypes.STRING(5),
        allowNull:true
      },
      mrt_st:{
        type:DataTypes.STRING(50),
        allowNull:true
      },
      gen_st:{
        type:DataTypes.STRING(50),
        allowNull:true
      },
      edu_st:{
        type:DataTypes.STRING(50),
        allowNull:true
      },
      dependants:{
        type:DataTypes.STRING(50),
        allowNull:true
      },
      b_grp:{
        type:DataTypes.STRING(50),
        allowNull:true
      },
      f_name:{
        type:DataTypes.STRING(50),
        allowNull:true
      },
      card_no:{
        type:DataTypes.STRING(50),
        allowNull:true
      },
      address:{
        type:DataTypes.STRING(150),
        allowNull:true
      },
      pin_code:{
        type:DataTypes.STRING(10),
        allowNull:true
      },
      city:{
        type:DataTypes.STRING(10),
        allowNull:true
      },
      landmark:{
        type:DataTypes.STRING(50),
        allowNull:true
      },
      telephone:{
        type:DataTypes.STRING(50),
        allowNull:true
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
      tableName: 'operators' // THIS LINE HERE
    });

    Operator.associate = function(models) {
      Operator.belongsTo(models.Role, {as: 'role_details', foreignKey: 'role_id'});
      Operator.belongsTo(models.Designation, {as: 'designation_details', foreignKey: 'current_designation_id'});
      Operator.belongsTo(models.MemberType, {as: 'member_type_details', foreignKey: 'member_type_id'});
    };

  return Operator;
  };
    