const Project = require('../models/projectModel');

// Similar structure to contactController but for projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProject = async (req, res) => {
  const project = new Project({
    title: req.body.title,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    completion: req.body.completion,
    description: req.body.description
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.title = req.body.title || project.title;
    project.firstname = req.body.firstname || project.firstname;
    project.lastname = req.body.lastname || project.lastname;
    project.email = req.body.email || project.email;
    project.completion = req.body.completion || project.completion;
    project.description = req.body.description || project.description;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.remove();
    res.json({ message: 'Project removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany({});
    res.json({ message: 'All projects removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};