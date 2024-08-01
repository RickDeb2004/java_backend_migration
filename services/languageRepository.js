// services/languageRepository.js

const { Language } = require('../models');

class LanguageRepository {
  async findAll() {
    return await Language.findAll();
  }

  async findById(id) {
    return await Language.findByPk(id);
  }

  async create(language) {
    return await Language.create(language);
  }

  async update(id, updatedLanguage) {
    return await Language.update(updatedLanguage, {
      where: { id }
    });
  }

  async delete(id) {
    return await Language.destroy({
      where: { id }
    });
  }
}

module.exports = new LanguageRepository();
