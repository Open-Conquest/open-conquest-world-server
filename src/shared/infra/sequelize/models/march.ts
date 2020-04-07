export default (sequelize, DataTypes) => {
  const march = sequelize.define('march', {
    march_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    army_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
    },
    start_tile_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    end_tile_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    start_time: {
      type: 'DATETIME',
    },
    end_time: {
      type: 'DATETIME',
    },
    speed_modifier: {
      type: DataTypes.FLOAT,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  march.associate = (models) => {
    models.march.hasOne(models.tile, {
      foreignKey: 'tile_id',
      sourceKey: 'start_tile_id',
      as: 'startTile',
    });
    models.march.hasOne(models.tile, {
      foreignKey: 'tile_id',
      sourceKey: 'end_tile_id',
      as: 'endTile',
    });
    models.march.hasOne(models.army, {
      foreignKey: 'army_id',
      sourceKey: 'army_id',
    });
  };

  return march;
};
