const express = require("express");
const Vocabulary = require("../models/Vocabulary");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create vocabulary
router.post("/", authMiddleware, async (req, res) => {
  const { word, meaning, example } = req.body;
  try {
    const newWord = new Vocabulary({ userId: req.userId, word, meaning, example, level: 1 });
    await newWord.save();
    res.status(201).json(newWord);
  } catch (err) {
    res.status(400).json({ error: "Failed to add word" });
  }
});

// Get all words for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const words = await Vocabulary.find({ userId: req.userId });
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch words" });
  }
});

// Random 10 words
router.get("/review", authMiddleware, async (req, res) => {
  console.log('req.userId',req.userId)
  try {
    const words = await Vocabulary.find({ userId: req.userId });
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch review words" });
  }
});

module.exports = router;
