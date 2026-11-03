import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateQRCode = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Please enter a URL or text.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setQrCode(null);

      const response = await axios.post(
        "http://localhost:3000/api/generate",
        {
          text: text
        },
        {
          responseType: "blob"
        }
      );

      const imageUrl = URL.createObjectURL(response.data);

      setQrCode(imageUrl);

    } catch (err) {
      console.error(err);
      setError("Unable to generate QR code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="qr-container">

        <h1>QR Code Generator</h1>

        <p>
          Generate QR codes for your URLs and text instantly.
        </p>

        <form onSubmit={generateQRCode}>

          <input
            type="text"
            placeholder="Enter a URL or text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate QR Code"}
          </button>

        </form>

        {error && (
          <p className="error">{error}</p>
        )}

        {qrCode && (
          <div className="qr-result">

            <h2>Your QR Code</h2>

            <img
              src={qrCode}
              alt="Generated QR Code"
            />

            <a
              href={qrCode}
              download="qr-code.png"
              className="download-btn"
            >
              Download QR Code
            </a>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;