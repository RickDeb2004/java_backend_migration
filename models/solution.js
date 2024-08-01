module.exports = (sequelize, DataTypes) => {
    const Solution = sequelize.define('Solution', {
      solution: DataTypes.TEXT,
      explanation: DataTypes.TEXT,
      complexity: DataTypes.TEXT,
      optimization: DataTypes.TEXT,
    }, {
      tableName: 'tbl_solution',
    });
  
    Solution.associate = (models) => {
      Solution.belongsTo(models.Question, {
        foreignKey: 'questionId',
        as: 'question',
      });
      Solution.belongsTo(models.Language, {
        foreignKey: 'languageId',
        as: 'language',
      });
    };
  
    return Solution;
  };
  