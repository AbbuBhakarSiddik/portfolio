const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


// 🔹 GET ALL PROJECTS (Public)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});


// 🔹 CREATE PROJECT (Admin Only)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, liveLink } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const project = await Project.create({
      title,
      description,
      liveLink,
      image: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project" });
  }
});


// 🔹 UPDATE PROJECT (Admin Only)
router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, liveLink } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Project not found" });

    project.title = title || project.title;
    project.description = description || project.description;
    project.liveLink = liveLink || project.liveLink;

    if (req.file) {
      project.image = `/uploads/${req.file.filename}`;
    }

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to update project" });
  }
});


// 🔹 DELETE PROJECT (Admin Only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project)
      return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project" });
  }
});

module.exports = router;