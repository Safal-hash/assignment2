const express = require('express');
const router = express.Router();
const {
  getQualifications,
  getQualification,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications
} = require('../controllers/qualificationController');

router.route('/')
  .get(getQualifications)
  .post(createQualification)
  .delete(deleteAllQualifications);

router.route('/:id')
  .get(getQualification)
  .put(updateQualification)
  .delete(deleteQualification);

module.exports = router;