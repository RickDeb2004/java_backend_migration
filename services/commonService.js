// services/commonService.js

const topicService = require('./topicService');

class CommonService {
  async getAllTopics() {
    return await topicService.findAll();
  }
}

module.exports = new CommonService();
