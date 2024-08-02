// routes/user.js

const express = require('express');
const router = express.Router();
const userQuestionController = require('../controllers/userQuestionController');

// Define user routes here
router.get('/find-by-code-language', userQuestionController.getByCodeLanguage);
router.get('/get-all-questions', userQuestionController.getAllQuestions);
router.get('/get-question/:questionId', userQuestionController.getQuestionDetails);
router.get('/get-solution', userQuestionController.getSolutionForQuestion);

module.exports = router;
