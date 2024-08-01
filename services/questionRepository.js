// services/questionRepository.js

const { Question, sequelize } = require('../models');

class QuestionRepository {
  async findAll() {
    return await Question.findAll();
  }

  async findById(id) {
    return await Question.findByPk(id);
  }

  async findByLanguage(language) {
    const query = `
      SELECT q.*
      FROM tbl_question q
      INNER JOIN tbl_question_language_template t ON q.id = t.question_id
      INNER JOIN tbl_language l ON t.language_id = l.id
      WHERE lower(l.name) = lower(:language)
    `;
    return await sequelize.query(query, {
      replacements: { language },
      type: sequelize.QueryTypes.SELECT,
      model: Question,
      mapToModel: true
    });
  }

  async findAllActiveQuestions() {
    return await Question.findAll({
      where: { active: true }
    });
  }

  async create(question) {
    return await Question.create(question);
  }

  async update(id, updatedQuestion) {
    return await Question.update(updatedQuestion, {
      where: { id }
    });
  }

  async delete(id) {
    return await Question.destroy({
      where: { id }
    });
  }
}

module.exports = new QuestionRepository();
