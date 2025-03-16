import { Scale } from "lucide-react";
import "../styles/Footer.css"; // Importing CSS file

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <Scale className="h-6 w-6" />
          <span>Legal Insight Companion</span>
        </div>
        <p className="footer-text">© {new Date().getFullYear()} Legal Insight Companion. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
