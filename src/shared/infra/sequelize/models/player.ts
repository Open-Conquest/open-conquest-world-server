export default (sequelize, DataTypes) => {
  const player = sequelize.define('player', {
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
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  player.associate = (models) => {
    models.player.belongsTo(models.user, {
      foreignKey: 'user_id',
    });
  };

  return player;
};
