import { useEffect, useState } from "react";
import Login from "./components/Login";
import "./App.css";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/")
            .then(response => response.json())
            .then(data => setMessage(data.message));
    }, []);

    return (
        <div className="app">
            <Login />
        </div>
    );
}

export default App;