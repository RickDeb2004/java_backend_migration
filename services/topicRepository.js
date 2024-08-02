// services/topicRepository.js

const { Topic } = require('../models');

class TopicRepository {
  async findAll() {
    return await Topic.findAll();
  }

  async findById(id) {
    return await Topic.findByPk(id);
  }

/**
  * Creates a new topic asynchronously.
  * @example
  * create({ name: 'New Topic' })
  * Returns a newly created topic object.
  * @param {Object} topic - The topic object to be created.
  * @returns {Promise<Object>} The created topic object.
  * @description
  *   - Uses the Topic model's create method.
  *   - Returns a promise that resolves to the created topic.
  */
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
