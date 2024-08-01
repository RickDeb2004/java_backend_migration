// models/userAccount.js
module.exports = (sequelize, DataTypes) => {
    const UserAccount = sequelize.define('UserAccount', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      sub: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      tableName: 'user_accounts', // Assuming the table name. Update if necessary.
    });
  
    UserAccount.associate = (models) => {
      UserAccount.hasOne(models.SubscriptionDetails, {
        foreignKey: 'userAccountId',
        as: 'subscriptionDetails',
      });
    };
  
    return UserAccount;
  };
  