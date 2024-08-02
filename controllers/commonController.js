// controllers/commonController.js

const express = require('express');
const AbstractController = require('./abstractController');
const commonService = require('../services/commonService');
const languageService = require('../services/languageService');
const router = express.Router();

router.get('/get-all-topics', async (req, res) => {
  try {
    const topics = await commonService.getAllTopics();
    res.status(StatusCodes.OK).json(AbstractController.success(topics));
  } catch (error) {
    console.error('get-all-topics-error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(AbstractController.failure('Error in getting topics'));
  }
});

router.get('/get-all-languages', async (req, res) => {
  try {
    const languages = await languageService.getAllLanguages();
    res.status(StatusCodes.OK).json(AbstractController.success(languages));
  } catch (error) {
    console.error('get-all-languages-error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(AbstractController.failure('Error in getting languages'));
  }
});

module.exports = router;
