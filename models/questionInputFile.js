module.exports = (sequelize, DataTypes) => {
    const QuestionInputFile = sequelize.define('QuestionInputFile', {
      path: DataTypes.STRING,
    }, {
      tableName: 'tbl_question_input_file',
    });
  
    QuestionInputFile.associate = (models) => {
      QuestionInputFile.belongsTo(models.Question, {
        foreignKey: 'questionId',
        as: 'question',
      });
    };
  
    return QuestionInputFile;
  };
  