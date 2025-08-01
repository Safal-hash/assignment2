const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts
} = require('../controllers/contactController');

router.route('/')
  .get(getContacts)
  .post(createContact)
  .delete(deleteAllContacts);

router.route('/:id')
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;