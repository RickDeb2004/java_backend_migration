// models/topic.js
module.exports = (sequelize, DataTypes) => {
    const Topic = sequelize.define('Topic', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tier: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    }, {
      tableName: 'tbl_topic',
    });
  
    // Define associations if any
    Topic.associate = (models) => {
      // associations can be defined here
    };
  
    return Topic;
  };
  