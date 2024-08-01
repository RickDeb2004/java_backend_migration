module.exports = (sequelize, DataTypes) => {
    const QuestionLanguageTemplate = sequelize.define('QuestionLanguageTemplate', {
      template: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      tableName: 'tbl_question_language_template',
    });
  
    QuestionLanguageTemplate.associate = (models) => {
      QuestionLanguageTemplate.belongsTo(models.Question, {
        foreignKey: 'questionId',
        as: 'question',
      });
      QuestionLanguageTemplate.belongsTo(models.Language, {
        foreignKey: 'languageId',
        as: 'language',
      });
    };
  
    return QuestionLanguageTemplate;
  };
  