// controllers/codeController.js

const express = require('express');
const AbstractController = require('./abstractController');
const codeService = require('../services/codeService');
const router = express.Router();

router.post('/execute', async (req, res) => {
  const codeDto = req.body;
  try {
    const response = await codeService.executeCode(codeDto);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error('code-execute-error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(AbstractController.failure('Error in executing code'));
  }
});

module.exports = router;
