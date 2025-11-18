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

// DELETE snippet
router.delete("/:id", protect, async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ msg: "Snippet not found" });
    }

    // only owner can delete
    if (snippet.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await snippet.deleteOne();
    res.json({ msg: "Snippet deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});



module.exports = router;
