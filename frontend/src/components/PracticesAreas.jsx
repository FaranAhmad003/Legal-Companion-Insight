import { useEffect, useState } from "react";
import { Shield, Users2, BookOpen } from "lucide-react";
import "../styles/PracticeAreas.css";

const PracticeAreas = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".practice-areas-container");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setAnimate(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      icon: <Shield className="practice-area-icon" />,
      title: "Secure Accounts",
      description: "Comprehensive legal solutions for businesses of all sizes",
    },
    {
      icon: <Users2 className="practice-area-icon" />,
      title: "Criminal Law",
      description: "Compassionate representation in family matters",
    },
    {
      icon: <BookOpen className="practice-area-icon" />,
      title: "Civil Litigation",
      description: "Expert advocacy in complex civil disputes",
    },
  ];

  return (
    <section className="practice-areas-container">
      <h2 className="practice-areas-title">Our Practice Areas</h2>
      <div className="practice-areas-grid">
        {services.map((service, index) => (
          <div key={index} className={`practice-area-card ${animate ? "animate" : ""}`}>
            {service.icon}
            <h3 className="practice-area-title">{service.title}</h3>
            <p className="practice-area-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PracticeAreas;
