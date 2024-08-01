// services/topicRepository.js

const { Topic } = require('../models');

class TopicRepository {
  async findAll() {
    return await Topic.findAll();
  }

  async findById(id) {
    return await Topic.findByPk(id);
  }

  async create(topic) {
    return await Topic.create(topic);
  }

  async update(id, updatedTopic) {
    return await Topic.update(updatedTopic, {
      where: { id }
    });
  }

  async delete(id) {
    return await Topic.destroy({
      where: { id }
    });
  }
}

module.exports = new TopicRepository();
