// models/subscriptionDetails.js
module.exports = (sequelize, DataTypes) => {
    const SubscriptionDetails = sequelize.define('SubscriptionDetails', {
      endDate: {
        type: DataTypes.DATE,
      },
    }, {
      tableName: 'tbl_subscription_details',
    });
  
    SubscriptionDetails.associate = (models) => {
      SubscriptionDetails.belongsTo(models.UserAccount, {
        foreignKey: 'userAccountId',
        as: 'userAccount',
      });
    };
  
    return SubscriptionDetails;
  };
  