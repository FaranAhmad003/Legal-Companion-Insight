import { Link } from "react-router-dom";
import { Scale } from "lucide-react";
import "../styles/Landing.css";
import lawyerImage from "../assets/Lawyer.png"; // Import image
import TopBar from "./TopBar";

const Landing = () => {
  return (
    <div className="top-bar-container">
      <TopBar />

      <div className="background-overlay"></div>

      {/* Floating Lawyer Image */}
      <img src={lawyerImage} alt="Lawyer" className="floating-lawyer" />
    </div>
  );
};

export default Landing;
