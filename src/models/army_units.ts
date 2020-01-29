/* eslint-disable camelcase */
export default (sequelize, DataTypes) => {
  const army_units = sequelize.define('army_units', {
    army_units_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    army_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    unit_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    unit_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  army_units.associate = (models) => {
    models.army_units.belongsTo(models.army, {
      foreignKey: 'army_id',
    });
    models.army_units.belongsTo(models.unit, {
      foreignKey: 'unit_id',
    });
  };

  return army_units;
};
