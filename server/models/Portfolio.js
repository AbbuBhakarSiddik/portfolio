const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    heroTitle: String,
    profileImage: String,
    aboutImage: String,
    resumeFile: String,
    cvFile: String,
    linkedin: String,
    github: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);