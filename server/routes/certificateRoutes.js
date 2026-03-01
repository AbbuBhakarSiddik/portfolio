const express = require("express");
const Certificate = require("../models/Certificate");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// 🔹 GET all certificates (Public)
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch certificates" });
  }
});

// 🔹 CREATE certificate (Admin)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, credentialLink } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const certificate = await Certificate.create({
      title,
      description,
      credentialLink,
      image: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: "Failed to create certificate" });
  }
});

// 🔹 UPDATE certificate
router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate)
      return res.status(404).json({ message: "Certificate not found" });

    certificate.title = req.body.title || certificate.title;
    certificate.description = req.body.description || certificate.description;
    certificate.credentialLink =
      req.body.credentialLink || certificate.credentialLink;

    if (req.file) {
      certificate.image = `/uploads/${req.file.filename}`;
    }

    await certificate.save();

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: "Failed to update certificate" });
  }
});

// 🔹 DELETE certificate
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Certificate deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete certificate" });
  }
});

module.exports = router;