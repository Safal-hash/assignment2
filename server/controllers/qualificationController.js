const Qualification = require('../models/qualificationModel');

exports.getQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) {
      return res.status(404).json({ message: 'Qualification not found' });
    }
    res.json(qualification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createQualification = async (req, res) => {
  const qualification = new Qualification({
    title: req.body.title,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    completion: req.body.completion,
    description: req.body.description
  });

  try {
    const newQualification = await qualification.save();
    res.status(201).json(newQualification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) {
      return res.status(404).json({ message: 'Qualification not found' });
    }

    qualification.title = req.body.title || qualification.title;
    qualification.firstname = req.body.firstname || qualification.firstname;
    qualification.lastname = req.body.lastname || qualification.lastname;
    qualification.email = req.body.email || qualification.email;
    qualification.completion = req.body.completion || qualification.completion;
    qualification.description = req.body.description || qualification.description;

    const updatedQualification = await qualification.save();
    res.json(updatedQualification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) {
      return res.status(404).json({ message: 'Qualification not found' });
    }

    await qualification.remove();
    res.json({ message: 'Qualification removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAllQualifications = async (req, res) => {
  try {
    await Qualification.deleteMany({});
    res.json({ message: 'All qualifications removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};