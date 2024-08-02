// controllers/userQuestionController.js

const express = require('express');
const userQuestionService = require('../services/userQuestionService');
const AbstractController = require('./abstractController');
const router = express.Router();

router.get('/find-by-code-language', async (req, res) => {
  const language = req.query.language;
  try {
    const questions = await userQuestionService.getByCodeLanguage(language);
    res.status(StatusCodes.OK).json(AbstractController.success(questions));
  } catch (error) {
    console.error('Error in find-by-code-language:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(AbstractController.failure('Internal Server Error'));
  }
});

router.get('/get-all-questions', async (req, res) => {
  try {
    const questions = await userQuestionService.getAllActiveQuestions();
    res.status(StatusCodes.OK).json(AbstractController.success(questions));
  } catch (error) {
    console.error('Error in get-all-questions:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(AbstractController.failure('Internal Server Error'));
  }
});

router.get('/get-question/:questionId', async (req, res) => {
  const questionId = parseInt(req.params.questionId, 10);
  try {
    const question = await userQuestionService.getQuestionDetails(req.authInfo, questionId);
    if (question) {
      res.status(StatusCodes.OK).json(AbstractController.success(question));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(AbstractController.failureWithStatus(StatusCodes.BAD_REQUEST, 'Question not found.'));
    }
  } catch (error) {
    console.error('Error in get-question:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(AbstractController.failure('Internal Server Error'));
  }
});

router.get('/get-solution', async (req, res) => {
  const questionId = parseInt(req.query.questionId, 10);
  try {
    const solutions = await userQuestionService.getSolution(questionId);
    res.status(StatusCodes.OK).json(AbstractController.success(solutions));
  } catch (error) {
    console.error('Error in get-solution:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(AbstractController.failure(error.message));
  }
});

module.exports = router;
