// routes/admin.js

const express = require('express');
const router = express.Router();
const adminQuestionController = require('../controllers/adminQuestionController');

// Define admin routes here
router.get('/get-all-questions', adminQuestionController.getAllQuestions);
router.get('/:questionId', adminQuestionController.getQuestionDetails);
router.delete('/delete-by-id', adminQuestionController.deleteQuestion);
router.post('/save', adminQuestionController.saveQuestion);
router.put('/update', adminQuestionController.updateQuestion);
router.post('/files-upload', adminQuestionController.filesUpload);

module.exports = router;
