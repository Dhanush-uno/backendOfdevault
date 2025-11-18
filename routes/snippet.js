
const express = require("express");
const Snippet = require("../models/Snippet");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create snippet
router.post("/", protect, async (req, res) => {
  const { title, code } = req.body;
  const snippet = await Snippet.create({
    title,
    code,
    userId: req.user._id,
  });
  res.json(snippet);
});

// Get user's snippets
router.get("/", protect, async (req, res) => {
  const snippets = await Snippet.find({ userId: req.user._id });
  res.json(snippets);
});

// 🔥 DELETE SNIPPET (THIS WAS MISSING)
router.delete("/:id", protect, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({
      _id: req.params.id,
      userId: req.user._id, // ensure user owns this snippet
    });

    if (!snippet) {
      return res.status(404).json({ msg: "Snippet not found" });
    }

    await snippet.deleteOne();
    res.json({ msg: "Snippet deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
