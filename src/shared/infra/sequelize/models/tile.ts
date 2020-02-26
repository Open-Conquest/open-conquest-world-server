export default (sequelize, DataTypes) => {
  const tile = sequelize.define('tile', {
    tile_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    map_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    tile_type: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    tile_row: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    tile_col: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  tile.associate = (models) => {
    models.tile.belongsTo(models.map, {
      foreignKey: 'map_id',
    });
  };

  return tile;
};
