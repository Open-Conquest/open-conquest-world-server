export default (sequelize, DataTypes) => {
  const city = sequelize.define('city', {
    city_id: {
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
    city_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    city_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  city.associate = (models) => {
    models.city.belongsTo(models.player, {
      foreignKey: 'player_id',
    });
  };

  return city;
};
