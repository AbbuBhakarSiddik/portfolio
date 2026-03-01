const express = require("express");
const Portfolio = require("../models/Portfolio");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


// 🔹 GET Portfolio (Public)
router.get("/", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch portfolio" });
  }
});


// 🔹 CREATE or UPDATE Portfolio (Admin)
router.put(
  "/",
  authMiddleware,
  upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "aboutImage", maxCount: 1 },
  { name: "resumeFile", maxCount: 1 },
  { name: "cvFile", maxCount: 1 },
]),
  async (req, res) => {
    try {
      let portfolio = await Portfolio.findOne();

      if (!portfolio) {
        portfolio = new Portfolio();
      }

      portfolio.heroTitle = req.body.heroTitle || portfolio.heroTitle;
      portfolio.linkedin = req.body.linkedin || portfolio.linkedin;
      portfolio.github = req.body.github || portfolio.github;

      if (req.files.profileImage) {
        portfolio.profileImage = `/uploads/${req.files.profileImage[0].filename}`;
      }

      if (req.files.aboutImage) {
        portfolio.aboutImage = `/uploads/${req.files.aboutImage[0].filename}`;
      }

      if (req.files.resumeFile) {
        portfolio.resumeFile = `/uploads/${req.files.resumeFile[0].filename}`;
      }
      if (req.files.cvFile) {
  portfolio.cvFile = `/uploads/${req.files.cvFile[0].filename}`;
}

      await portfolio.save();

      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ message: "Failed to update portfolio" });
    }
  }
);

module.exports = router;