export default (sequelize, DataTypes) => {
  let unit = sequelize.define('unit', {
    unit_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    attack: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    defense: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    gold_cost: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  unit.associate = (models) => {
  };

  return unit;
};
