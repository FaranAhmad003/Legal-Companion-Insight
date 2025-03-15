import { Scale } from "lucide-react";
import "../styles/TopBar.css";


const TopBar = () => {
  return (
    <div className="top-bar-container">
      <nav className="top-bar">
        <div className="logo">
          <Scale className="h-8 w-8 text-legal-beige" />
          <span className="ml-2 text-2xl font-serif text-legal-beige">Legal Companion Insight</span>
        </div>
        <div className="menu">
          {['Home', 'Services', 'About', 'Login'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </div>
      </nav>
      <div className="background-overlay" style={{ backgroundColor: "rgba(92, 64, 51, 0.5)" }}></div>

      
    </div>
  );
};

export default TopBar;