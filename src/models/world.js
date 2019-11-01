module.exports = (sequelize, DataTypes) => {
  let world = sequelize.define('world', {
    world_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    world_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return world;
};