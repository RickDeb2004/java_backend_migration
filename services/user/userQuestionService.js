// services/user/userQuestionService.js

const { Op } = require('sequelize');
const { Question, UserAccount, SubscriptionDetails, Language, Solution, QuestionLanguageTemplate } = require('../../models');
const { toQuestionDTO, toQuestionDetailsDTO, toQuestionLanguageTemplateList, toSolutionDTOList } = require('../../mappers/questionRecordMapper');
const { getByUserSub } = require('../userAccountService');

class UserQuestionService {
  async getByCodeLanguage(language) {
    return await Question.findAll({
      include: [{
        model: Language,
        where: { name: { [Op.iLike]: language } }
      }]
    });
  }

  async getAllActiveQuestions() {
    const questions = await Question.findAll({
      where: { active: true }
    });
    return questions.map(toQuestionDTO);
  }

  async getQuestionDetails(authentication, questionId) {
    const question = await Question.findByPk(questionId);

    if (!question) {
      return null;
    }

    const questionResponseDTO = toQuestionDTO(question);

    if (question.tier >= 2) {
      if (authentication) {
        const userAccount = await getByUserSub(authentication.name);

        if (userAccount) {
          if (question.tier === 3) {
            const subscription = userAccount.subscriptionDetails;

            if (subscription && subscription.endDate > new Date()) {
              questionResponseDTO.questionDetails = toQuestionDetailsDTO(question);
              questionResponseDTO.templates = toQuestionLanguageTemplateList(question.templates);
            }
          } else {
            questionResponseDTO.questionDetails = toQuestionDetailsDTO(question);
            questionResponseDTO.templates = toQuestionLanguageTemplateList(question.templates);
          }
        }
      }
    } else {
      questionResponseDTO.questionDetails = toQuestionDetailsDTO(question);
      questionResponseDTO.templates = toQuestionLanguageTemplateList(question.templates);
    }

    return questionResponseDTO;
  }

  async getSolution(questionId) {
    const question = await Question.findByPk(questionId, {
      include: [Solution]
    });

    if (!question) {
      throw new Error('Invalid question id.');
    }

    let solutionDTOList = toSolutionDTOList(question.solutions);

    if (question.solutionTier >= 2) {
      const authentication = this.getAuthentication();
      
      if (authentication) {
        const userAccount = await getByUserSub(authentication.name);

        if (userAccount) {
          if (question.solutionTier === 3) {
            const subscriptionDetails = userAccount.subscriptionDetails;

            if (!subscriptionDetails || subscriptionDetails.endDate <= new Date()) {
              solutionDTOList = [];
            }
          }
        } else {
          solutionDTOList = [];
        }
      } else {
        solutionDTOList = [];
      }
    }

    return solutionDTOList;
  }

  getAuthentication() {
    const context = SecurityContextHolder.getContext();
    return context ? context.getAuthentication() : null;
  }
}

module.exports = new UserQuestionService();
