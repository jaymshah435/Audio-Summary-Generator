# Audio Summary Generator

A full-stack application that allows users to upload audio files, transcribes the audio using AssemblyAI, and generates human-friendly summaries using Google Gemini AI. The app supports iterative summarization to refine the summary further.

---


## 🎥 Demo

[Click here to watch the demo video](https://drive.google.com/file/d/1f8V-uBsuWnr7RfEmwewt7RmAuQwNU11S/view?usp=sharing)


## Features

- Upload audio files (up to 50MB)
- Audio transcription using AssemblyAI API
- Generate natural, human-like summaries using Google Gemini AI
- Re-summarize to create more concise and emotionally engaging summaries
- Clear file and summary management in UI

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React.js
- **APIs:** AssemblyAI (transcription), Google Gemini AI (summarization)
- **File Upload:** Multer
- **CORS:** Enabled for frontend-backend communication

---

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn
- AssemblyAI API key
- Google Gemini API key

---

### Backend Setup

1. Clone the repo and navigate to the `backend` folder:

    ```bash
    cd backend
    ```

2. Create a `.env` file with the following content:

    ```env
    PORT=3006
    ASSEMBLY_API_KEY=your_assemblyai_api_key
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

3. Install dependencies and start the server:

    ```bash
    npm install
    node server.js
    ```

    The backend server should start on `http://localhost:3006`.

---

### Frontend Setup

1. Navigate to the frontend directory (if separate) or root if combined.

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm run dev
    ```

    The frontend will run on `http://localhost:5173` (or another port).

---

## Usage

1. Open the frontend URL in your browser.
2. Upload an audio file.
3. Click **Summarize the audio** to generate the first summary.
4. Optionally click **Summarize again** to refine the summary.
5. Clear the file and start over as needed.

---

## Notes

- Max upload size is 50MB.
- Ensure API keys are valid and have proper permissions.
- The backend must be running and accessible from the frontend.

---

## License

MIT License

---

## Contact

For issues or suggestions, feel free to open an issue or reach out.
