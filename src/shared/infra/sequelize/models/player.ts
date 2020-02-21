export default (sequelize, DataTypes) => {
  const user = sequelize.define('player', {
    player_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  user.associate = (models) => {
    models.player.belongsTo(models.user, {
      foreignKey: {
        name: 'user_id',
      },
    });
  };

  return user;
};
