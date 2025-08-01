const Contact = require('../models/contactModel');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Public
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a contact
// @route   POST /api/contacts
// @access  Public
exports.createContact = async (req, res) => {
  const contact = new Contact({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Public
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.firstname = req.body.firstname || contact.firstname;
    contact.lastname = req.body.lastname || contact.lastname;
    contact.email = req.body.email || contact.email;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Public
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.json({ message: 'Contact removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete all contacts
// @route   DELETE /api/contacts
// @access  Public
exports.deleteAllContacts = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: 'All contacts removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};