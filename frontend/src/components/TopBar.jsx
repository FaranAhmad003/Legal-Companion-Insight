import { Link } from "react-router-dom";
import { Scale } from "lucide-react";
import "../styles/TopBar.css"; // Import the CSS file for styling

const TopBar = () => {
  return (
    <nav className="top-bar">
      <div className="logo">
        <Scale className="h-8 w-8 text-legal-beige" />
        <span className="ml-2 text-2xl font-serif text-legal-beige">Legal Companion Insight</span>
      </div>
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/chats">Chat</Link>
        <Link to="/cases">Cases</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default TopBar;
