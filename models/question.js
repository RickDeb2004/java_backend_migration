module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define('Language', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tier: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
    }, {
      tableName: 'tbl_language',
    });
  
    Language.associate = (models) => {
      Language.hasMany(models.Solution, {
        foreignKey: 'languageId',
        as: 'solutions',
      });
      Language.hasMany(models.QuestionLanguageTemplate, {
        foreignKey: 'languageId',
        as: 'templates',
      });
    };
  
    return Language;
  };
  