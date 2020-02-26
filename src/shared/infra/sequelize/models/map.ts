export default (sequelize, DataTypes) => {
  const map = sequelize.define('map', {
    map_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    map_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  map.associate = (models) => {
  };

  return map;
};
