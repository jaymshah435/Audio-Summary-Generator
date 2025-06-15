const express = require("express");
const multer = require("multer");
const {
    summarizeAudio,
    reSummarizeTextController
} = require("../controllers/transcriptController");

const router = express.Router();

// Configure in-memory file storage with file size limit
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Route to summarize audio
router.post("/summarize", upload.single("audio"), summarizeAudio);

// Route to re-summarize existing text
router.post("/reSummarize", reSummarizeTextController);

module.exports = router;