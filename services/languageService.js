// services/languageService.js

const languageService = require('./languageService');

class LanguageService {
  async getAllLanguages() {
    return await languageService.findAll();
  }

  async getLanguageByIds(languageIds) {
    return await languageService.findAllByIds(languageIds);
  }
}

module.exports = new LanguageService();
