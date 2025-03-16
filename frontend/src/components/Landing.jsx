import { Link } from "react-router-dom";
import { Scale } from "lucide-react";
import "../styles/Landing.css";
import lawyerImage from "../assets/Lawyer.png"; // Import image

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
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <div className="background-overlay"></div>

      {/* Floating Lawyer Image */}
      <img src={lawyerImage} alt="Lawyer" className="floating-lawyer" />
    </div>
  );
};

export default Landing;
