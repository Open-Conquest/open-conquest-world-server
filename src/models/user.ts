export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  user.associate = (models) => {
  };

  return user;
};
