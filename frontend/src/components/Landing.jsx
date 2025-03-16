import { Link } from "react-router-dom";
import { Scale } from "lucide-react";
import "../styles/Landing.css";

const Landing = () => {
  return (
    <div className="top-bar-container">
      <nav className="top-bar">
        <div className="logo">
          <Scale className="h-8 w-8 text-legal-beige" />
          <span className="ml-2 text-2xl font-serif text-legal-beige">Legal Companion Insight</span>
        </div>
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link> {/* Updated Link for Login */}
        </div>
      </nav>
      <div className="background-overlay" style={{ backgroundColor: "rgba(92, 64, 51, 0.5)" }}></div>
    </div>
  );
};

export default Landing;
