module.exports = (sequelize, DataTypes) => {
  let map = sequelize.define('map', {
    map_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    world_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  map.associate = function (models) {
    models.map.belongsTo(models.world, {
      foreignKey: 'world_id'
    });
  };

  return map;
};