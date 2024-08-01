module.exports = (sequelize, DataTypes) => {
    const AbstractEntity = sequelize.define('AbstractEntity', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      createdBy: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedBy: {
        type: DataTypes.STRING,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      paranoid: false,
      tableName: 'abstract_entities',
    });
  
    return AbstractEntity;
  };
  