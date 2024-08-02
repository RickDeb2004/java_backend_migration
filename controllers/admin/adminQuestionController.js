// controllers/adminQuestionController.js

const express = require('express');
const questionService = require('../services/questionService');
const multer = require('multer');
const upload = multer();
const router = express.Router();

router.get('/get-all-questions', async (req, res) => {
  try {
    const questionDetails = await questionService.getAllQuestions();
    res.status(200).json({ success: true, data: questionDetails });
  } catch (error) {
    console.error('Error in get-all-questions:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/:questionId', async (req, res) => {
  const questionId = parseInt(req.params.questionId, 10);
  try {
    const questionDetails = await questionService.getQuestionDetailsById(questionId);
    if (questionDetails) {
      res.status(200).json({ success: true, data: questionDetails });
    } else {
      res.status(404).json({ success: false, message: 'Question does not exist.' });
    }
  } catch (error) {
    console.error('Error in getQuestionDetails:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/delete-by-id', async (req, res) => {
  const questionId = parseInt(req.query.questionId, 10);
  try {
    const isDeleted = await questionService.deleteQuestionById(questionId);
    res.status(200).json({ success: true, data: isDeleted });
  } catch (error) {
    console.error('Error in deleteQuestion:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/save', async (req, res) => {
  try {
    const savedQuestion = await questionService.saveQuestion(req.body);
    res.status(200).json({ success: true, data: savedQuestion });
  } catch (error) {
    console.error('Error in saveQuestion:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.put('/update', async (req, res) => {
  try {
    const updatedQuestion = await questionService.saveQuestion(req.body);
    res.status(200).json({ success: true, data: updatedQuestion });
  } catch (error) {
    console.error('Error in updateQuestion:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/files-upload', upload.array('files'), async (req, res) => {
  const questionId = parseInt(req.body.questionId, 10);
  const files = req.files;
  try {
    const uploadedFileURLs = await questionService.uploadInputFilesToS3(questionId, files);
    if (uploadedFileURLs.length < files.length) {
      res.status(400).json({ success: false, message: 'Failed to upload files. Please retry.' });
    } else {
      res.status(200).json({ success: true, data: uploadedFileURLs });
    }
  } catch (error) {
    console.error('Error in filesUpload:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
