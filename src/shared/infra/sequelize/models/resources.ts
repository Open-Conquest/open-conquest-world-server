export default (sequelize, DataTypes) => {
  const resources = sequelize.define('resources', {
    resources_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    player_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    gold: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  resources.associate = (models) => {
    models.resources.belongsTo(models.player, {
      foreignKey: 'player_id',
    });
  };

  return resources;
};
