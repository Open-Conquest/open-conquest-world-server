export default (sequelize, DataTypes) => {
  const map = sequelize.define('map', {
    map_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  map.associate = (models) => {
  };

  return map;
};
