const express = require("express");
const Vocabulary = require("../models/Vocabulary");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose= require("mongoose");

const router = express.Router();

// Create vocabulary
router.post("/", authMiddleware, async (req, res) => {
  const { word, meaning, example, type } = req.body;
  try {
    const newWord = new Vocabulary({ userId: req.userId, word, meaning, example, level: 1, type });
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
  try {
    const words = await Vocabulary.find({ userId: req.userId });
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch review words" });
  }
});

router.put("/edit-word", authMiddleware, async (req, res, next) => {
  try {
    const words = await Vocabulary.find({ _id: req.body._id });
    const data = {...req.body};
    if (words) {
        const newUpdate = await Vocabulary.findByIdAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.body._id) },
            { $set: data },
            { new: true, runValidators: true }
        )
        if (newUpdate) {
          return res.json(newUpdate);
        }
      }
      return res.status(500).json({ error: "Failed to fetch review words" });
  } catch (err) {
    res.status(500).json({ error: err, message: "Failed to fetch review words" });
  }
});


router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const _id = req.params.id;
    console.log(_id,'id');
    const result = await Vocabulary.findOne({_id: new mongoose.Types.ObjectId(_id)}).lean();
    if (result) {
        const deleted =  await Vocabulary.deleteOne({
            _id: new mongoose.Types.ObjectId(_id)
        })
        if (deleted) {
          return res.status(200).json({ message: "destroy word done!" });
        }
    }
      return res.status(500).json({ error: "Failed to fetch review words" });
  } catch (err) {
    console.log(err,'err');
    res.status(500).json({ error: err, message: "Failed to fetch review words" });
  }
});
module.exports = router;
