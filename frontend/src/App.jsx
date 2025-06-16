import { useState, useRef } from 'react';
import axios from 'axios';

function App() {
  // State for storing uploaded audio file
  const [audioFile, setAudioFile] = useState(null);
  // State for storing the summary result
  const [summary, setSummary] = useState('');
  // Counter to track how many times summarization has been done
  const [summaryCount, setSummaryCount] = useState(0);
  // Loading state to indicate ongoing API call
  const [loading, setLoading] = useState(false);
  // Ref to access the input element (for clearing file input)
  const inputRef = useRef(null);

  // Handle file input change
  function onFileChange(e) {
    const file = e.target.files[0];
    setAudioFile(file);
  }

  // Clear selected audio file and reset related state
  function clearFile() {
    setAudioFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSummary("");
    setSummaryCount(0);
  }

  // Call the API to summarize or re-summarize the audio
  async function onSummarize() {
    setLoading(true);
    let summaryText;
    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      // First-time summarization
      if (summaryCount === 0) {
        summaryText = await axios.post(
          "http://localhost:3006/api/transcript/summarize",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Re-summarization (improved or alternative summary)
        summaryText = await axios.post(
          "http://localhost:3006/api/transcript/reSummarize",
          { summary }
        );
      }

      // Update summary and increment version count
      setSummary(summaryText.data.result);
      setSummaryCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      alert('Failed to summarize');
    }

    setLoading(false);
  }

  return (
    <>
      <div className="h-screen p-6 flex flex-col bg-black">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold text-white mb-6">Summary Generator</h1>
        </div>

        <div className="flex flex-1 gap-4 text-white p-2">
          {/* Left Panel: File Upload and Summarize Button */}
          <div className="flex-1 flex flex-col border border-gray-600 rounded p-4 relative">
            <h2 className="text-xl font-semibold mb-2">Upload Audio</h2>

            {/* File input */}
            <input
              type="file"
              accept="audio/*"
              name="audio"
              onChange={onFileChange}
              ref={inputRef}
              className="mb-4 border border-gray-600 p-1 w-96 rounded cursor-pointer bg-gray-900 text-gray-400"
            />

            {/* Display selected file name and clear option */}
            {audioFile && (
              <div className="flex items-center justify-between bg-gray-900 p-2 rounded w-96">
                <span className="truncate">{audioFile.name}</span>
                <button
                  onClick={clearFile}
                  aria-label="Clear audio file"
                  className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                >
                  X
                </button>
              </div>
            )}

            {/* Summarize Button and Summary Version Indicator */}
            {audioFile && (
              <div className="flex flex col text-white">
                <button
                  disabled={loading}
                  onClick={onSummarize}
                  className="absolute bottom-8 right-4 bg-blue-600 text-white px-6 py-2 rounded cursor-pointer"
                >
                  {loading
                    ? "Summarizing.."
                    : summaryCount === 0
                    ? "Summarize the audio"
                    : "Summarize again"}
                </button>

                {summaryCount > 0 && (
                  <div>
                    <p className="absolute bottom-1 right-4 text-gray-400">
                      Summary Version: {summaryCount}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel: Display Summary Output */}
          <div className="flex-1 bg-gray-900 border border-gray-600 rounded p-4">
            <div className="flex-1 flex flex-col">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold mb-2">Summary Output</h2>
              </div>

              <div className="text-gray-400 p-2">
                {summary || <span>Summary will appear here...</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;