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
        allowNull: false,
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
      /* member_type:{
        type: DataTypes.ENUM('Governing Body','Advisory Committe','Coordinators', 'Heads', 'Senior Executive Members', 'Our Alumni'),
        allowNull: false
      }, */
      member_type_id: {
        type:DataTypes.INTEGER(11),
        allowNull:false
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
        allowNull:false
      },
      department:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      /* role_id: {
        type:DataTypes.INTEGER(11),
        allowNull:true
      }, */
      /* current_designation_id: {
        type:DataTypes.INTEGER(11),
        allowNull:true
      }, */
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
      tableName: 'operators' // THIS LINE HERE
    });

    Operator.associate = function(models) {
      Operator.belongsTo(models.Role, {as: 'role_details', foreignKey: 'role_id'});
      Operator.belongsTo(models.Designation, {as: 'designation_details', foreignKey: 'current_designation_id'});
      Operator.belongsTo(models.MemberType, {as: 'member_type_details', foreignKey: 'member_type_id'});
    };

  return Operator;
  };
    