const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getUserProfile,
  updateUserProfile,
} = require('../controllers/profilecontroller');

const router = express.Router();

router.route('/:id')
  .get(protect, authorize, getUserProfile)
  .put(protect, authorize, updateUserProfile);

module.exports = router;