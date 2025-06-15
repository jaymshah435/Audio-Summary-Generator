const { transcribeAudio } = require("../utils/assemblyAi");
const {
    summarizeText,
    reSummarizeText
} = require("../utils/gemini");

// Controller to handle /summarize
const summarizeAudio = async (req, res) => {
    try {
        const buffer = req.file.buffer;
        const transcript = await transcribeAudio(buffer);
        const result = await summarizeText(transcript);

        res.json({ result });
    } catch (error) {
        console.error("Summarize Error:", error.message);
        res.status(500).send("Server failed to summarize audio");
    }
};

// Controller to handle /reSummarize
const reSummarizeTextController = async (req, res) => {
    try {
        const transcript = req.body.summary;
        const result = await reSummarizeText(transcript);

        res.json({ result });
    } catch (error) {
        console.error("Re-summarize Error:", error.message);
        res.status(500).send("Server failed to re-summarize text");
    }
};

module.exports = {
    summarizeAudio,
    reSummarizeTextController
};
