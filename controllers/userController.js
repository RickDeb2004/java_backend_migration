// controllers/userController.js

const express = require('express');
const AbstractController = require('./abstractController');
const userAccountService = require('../services/userAccountService');
const router = express.Router();

router.post('/user-info', async (req, res) => {
  const userDto = req.body;
  try {
    const userInfo = await userAccountService.getUserInfo(userDto);
    res.status(StatusCodes.OK).json(AbstractController.success(userInfo));
  } catch (error) {
    console.error('getUserInfo-error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(AbstractController.failure('Error in getting user info'));
  }
});

module.exports = router;
