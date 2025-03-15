import { useState } from "react";
import { User, Mail, Lock, Phone, ArrowRight, ChevronRight } from "lucide-react";
import "../styles/Login.css";
import Landing from "./Landing";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <>
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
                  <input type="text" placeholder="John" className="small-input" />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Doe" className="small-input" />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="small-input" />
                </div>
              </>
            )}

            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" className="small-input" />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" className="small-input" />
            </div>

            <button type="submit" className="login-button">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="switch-mode">
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
