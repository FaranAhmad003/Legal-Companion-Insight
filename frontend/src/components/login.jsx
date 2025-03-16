import { useState } from "react";
import { Link } from "react-router-dom";
import { Scale } from "lucide-react";
import "../styles/Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    phone_no: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "http://127.0.0.1:8000/login/" : "http://127.0.0.1:8000/signup/";
    const requestBody = isLogin
      ? { username: formData.username, password: formData.password }
      : formData;

    console.log("Sending data to:", endpoint);
    console.log("Request Body:", requestBody);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);
      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        alert("Success: " + JSON.stringify(data));
        if (isLogin) {
          localStorage.setItem("token", data.access_token);
        }
      } else {
        console.log("Error from API:", data);
        alert("Error: " + (data.detail || "Something went wrong"));
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network error, please try again later.");
    }
  };

  return (
    <>
      {/* ✅ TopBar (Now Embedded) */}
      <nav className="top-bar">
        <div className="logo">
          <Scale className="h-8 w-8 text-legal-beige" />
          <span className="ml-2 text-2xl font-serif text-legal-beige">Legal Companion Insight</span>
        </div>
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      {/* ✅ Login/Signup Form */}
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
            <p>{isLogin ? "Please sign in to continue" : "Fill in your details to get started"}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Show extra fields for Signup */}
            {!isLogin && (
              <>
                <div className="input-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    placeholder="John"
                    className="small-input"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    placeholder="Doe"
                    className="small-input"
                  />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="small-input"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone_no"
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="small-input"
                  />
                </div>
              </>
            )}

            {/* Username & Password Fields */}
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="Enter Username"
                className="small-input"
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                className="small-input"
                required
              />
            </div>

            <button type="submit" className="login-button">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Switch between Login and Signup */}
          <div className="switch-mode">
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
