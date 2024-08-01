const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
});

const models = {
  AbstractEntity: require('./abstractEntity')(sequelize, Sequelize.DataTypes),
  Language: require('./language')(sequelize, Sequelize.DataTypes),
  Question: require('./question')(sequelize, Sequelize.DataTypes),
  QuestionInputFile: require('./questionInputFile')(sequelize, Sequelize.DataTypes),
  QuestionLanguageTemplate: require('./questionLanguageTemplate')(sequelize, Sequelize.DataTypes),
  Solution: require('./solution')(sequelize, Sequelize.DataTypes),
  SubscriptionDetails: require('./subscriptionDetails')(sequelize, Sequelize.DataTypes),  // Add this line
  UserAccount: require('./userAccount')(sequelize, Sequelize.DataTypes),  // Add this line
  Topic: require('./topic')(sequelize, Sequelize.DataTypes), // Add this line
};

require('./associations')(models);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
