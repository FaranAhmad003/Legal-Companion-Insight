import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";

function App() {
  const [backendMessage, setBackendMessage] = useState("Connecting to FastAPI...");
  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((response) => response.json())
      .then((data) => setBackendMessage(data.message))
      .catch((error) => {
        console.error("Error connecting to FastAPI:", error);
        setBackendMessage("Failed to connect to FastAPI");
      });
  }, []);

  return (
    <Router>
      <div>
        {/* Backend connection status message */}
        <h2 style={{ textAlign: "center", color: "green" }}>
          {backendMessage}
        </h2>

        {}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
