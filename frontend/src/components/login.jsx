import { useState } from "react";
import { User, Mail, Lock, Phone, ArrowRight, ChevronRight } from "lucide-react";
import "../styles/Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    first_name: "", 
    last_name: "", 
    username: "", 
    password: "", 
    email: "", 
    phone_no: "" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "http://127.0.0.1:8000/login/" : "http://127.0.0.1:8000/signup/";
    const requestBody = isLogin
      ? { username: formData.username, password: formData.password }
      : { ...formData };

    console.log("Sending data to:", endpoint);
    console.log("Request Body:", requestBody);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        mode: "cors",
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
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p>{isLogin ? 'Please sign in to continue' : 'Fill in your details to get started'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="input-group">
                <label>First Name</label>
                <input type="text" name="first_name" onChange={handleChange} className="small-input" />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" name="last_name" onChange={handleChange} className="small-input" />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} className="small-input" />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input type="tel" name="phone_no" onChange={handleChange} className="small-input" />
              </div>
            </>
          )}

          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" onChange={handleChange} className="small-input" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} className="small-input" />
          </div>

          <button type="submit" className="login-button">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="switch-mode">
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
