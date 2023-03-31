module.exports = function(sequelize, DataTypes) {
    const MemberSocialConnect = sequelize.define('MemberSocialConnect', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      member_id:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      fm_name:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      fm_rel:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      fm_eml:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      so_name:{
        type: DataTypes.STRING(255),
        allowNull: true
      },
      so_rel:{
        type: DataTypes.STRING(255),
        allowNull: true
        
      },
      so_eml:{
        type: DataTypes.STRING(255),
        allowNull: true
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
      tableName: 'member_social_connect' // THIS LINE HERE
    });

    return MemberSocialConnect;

  };
    