module.exports = (models) => {
    models.Language.associate(models);
    models.Question.associate(models);
    models.QuestionInputFile.associate(models);
    models.QuestionLanguageTemplate.associate(models);
    models.Solution.associate(models);
    models.SubscriptionDetails.associate(models);
    models.UserAccount.associate(models);  // Add this line
    models.Topic.associate(models); 
  };
  