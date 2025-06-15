const axios = require("axios");

/**
 * Uploads audio buffer to AssemblyAI and returns a URL.
 */
async function audioUrl(buffer) {
    try {
        const res = await axios.post("https://api.assemblyai.com/v2/upload", buffer, {
            headers: {
                authorization: `${process.env.ASSEMBLY_API_KEY}`,
            }
        });
        return res.data.upload_url;
    } catch (error) {
        console.error("Upload error:", error.response?.data || error.message);
        throw error;
    }
}

/**
 * Initiates transcription process with AssemblyAI and returns transcript ID.
 */
async function startTranscription(audioURL) {
    const res = await axios.post("https://api.assemblyai.com/v2/transcript", {
        audio_url: audioURL,
        speech_model: "slam-1"
    }, {
        headers: {
            authorization: `${process.env.ASSEMBLY_API_KEY}`
        }
    });

    return res.data.id;
}

/**
 * Polls AssemblyAI until the transcription is complete.
 */
async function waitForTranscript(id) {
    while (true) {
        const pollingResponse = await axios.get(`https://api.assemblyai.com/v2/transcript/${id}`, {
            headers: {
                authorization: `${process.env.ASSEMBLY_API_KEY}`
            }
        });

        if (pollingResponse.data.status === "completed") {
            return pollingResponse.data.text;
        }

        if (pollingResponse.data.status === "error") {
            throw new Error("Transcription Failed: " + pollingResponse.data.error);
        }

        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait before polling again
    }
}

/**
 * Orchestrates the transcription process from buffer to final text.
 */
async function transcribeAudio(buffer) {
    const audioURL = await audioUrl(buffer);
    const id = await startTranscription(audioURL);
    const result = await waitForTranscript(id);
    return result;
}

module.exports = { transcribeAudio };
