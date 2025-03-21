import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";
import Cases from "./components/Cases";
import Chats from "./components/Chats";
import ContextProvider from "./components/Context"; 



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
      <ContextProvider>  {/* ✅ Wrap ContextProvider */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/chats" element={<Chats />} />  {/* Chats will now have context */}
        </Routes>
      </ContextProvider>
    </Router>
  );
}

export default App;
