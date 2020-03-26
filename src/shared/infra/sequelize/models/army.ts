export default (sequelize, DataTypes) => {
  const army = sequelize.define('army', {
    army_id: {
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

  army.associate = (models) => {
    models.army.hasMany(models.army_units, {
      foreignKey: 'army_id',
    });
  };

  return army;
};
