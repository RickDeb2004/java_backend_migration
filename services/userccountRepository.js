// services/userAccountRepository.js

const { UserAccount } = require('../models');

class UserAccountRepository {
  async findAll() {
    return await UserAccount.findAll();
  }

  async findById(id) {
    return await UserAccount.findByPk(id);
  }

  async findFirstBySub(sub) {
    return await UserAccount.findOne({
      where: { sub }
    });
  }

  async findBySub(sub) {
    return await UserAccount.findOne({
      where: { sub }
    });
  }

  async create(userAccount) {
    return await UserAccount.create(userAccount);
  }

  async update(id, updatedUserAccount) {
    return await UserAccount.update(updatedUserAccount, {
      where: { id }
    });
  }

  async delete(id) {
    return await UserAccount.destroy({
      where: { id }
    });
  }
}

module.exports = new UserAccountRepository();
