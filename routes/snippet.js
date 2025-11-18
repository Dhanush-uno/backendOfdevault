const express = require("express");
const Snippet = require("../models/Snippet");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create snippet
router.post("/", protect, async (req, res) => {
  try {
    const { title, code } = req.body;

    const snippet = await Snippet.create({
      title,
      code,
      userId: req.user._id,
    });

    res.json(snippet);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create snippet" });
  }
});

// Get user snippets
router.get("/", protect, async (req, res) => {
  try {
    const snippets = await Snippet.find({ userId: req.user._id });
    res.json(snippets);
  } catch {
    res.status(500).json({ msg: "Error fetching snippets" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  await Snippet.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});


module.exports = router;
